import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/context'
import { Avatar, Box, Button, Circle, FormControl, IconButton, Image, Input, Modal, ModalBody, ModalContent, ModalOverlay, Spinner, Text, Toast, position, useDisclosure } from '@chakra-ui/react'
import './style.css'
import { FaArrowLeft } from "react-icons/fa";
import { getSender, getSenderFull, getpic } from './chatlogic';
import ProfileModal from '../components/miscellaneous/ProfileModal';
import UpdateGroupModel from '../components/Groups/UpdateGroupModel';
import axios from 'axios';
import Scrollchat from './Scrollchat';
import { io } from 'socket.io-client';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from "react-icons/md"
const ENDPOINT = "http://localhost:2021"
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [messages, setMessages] = useState([]);
  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();
  const [loading, setLoading] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const[cemoji,setemoji]=useState(false)

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage(" ")
        const { data } = await axios.post(
          "http://localhost:2021/api/messages",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        Toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:2021/api/messages/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);

    } catch (error) {
      Toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value)
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const handleEmojiClick = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji);
  };



  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // // eslint-disable-next-line
  }, [selectedChat]);
  return (
    <>
      {
        selectedChat ? <>
          <Box
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            cursor={'pointer'}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<FaArrowLeft />}
              onClick={() => setSelectedChat("")}
            />

            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}>
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      gap={3}
                      marginLeft={6}
                    >
                      <Circle size='35px' bg='grey' color='white' overflow={'hidden'} textAlign={'center'}>
                        {
                          <Image src={getSenderFull(user, selectedChat.users).pic
                          } alt="naruto"
                            height={'100%'}
                            objectFit={'cover'}
                          />
                        }
                      </Circle>
                      {getSender(user, selectedChat.users)}
                    </Box>
                  </ProfileModal>
                </>
              ) : (
                <>
                  <UpdateGroupModel
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  >
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      gap={3}
                      marginLeft={6}
                    >
                      <Circle size='35px' bg='grey' color='white' overflow={'hidden'} textAlign={'center'}>
                        {selectedChat.chatName.toUpperCase()[0]}
                      </Circle>

                      {selectedChat.chatName.toUpperCase()}
                    </Box>

                  </UpdateGroupModel>
                </>
              ))}
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-end'}
            p={3}
            position={'relative'}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <Scrollchat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>

                  <Spinner />
                  loading..
                </div>
              ) : (
                <></>
              )}
              <Box 
              display={'flex'}
              alignItems={'center'}
              gap={2}>
                
              {cemoji?
                      <EmojiPicker
                        style={{
                          position: 'absolute',
                          bottom: '100%', 
                          left: 0,
                          zIndex: 1, 
                          marginBottom: '2px', 
                        }}
                        previewConfig={{
                          showPreview: false,
                        }}
                        height={300}
                        searchDisabled={true}
                        onEmojiClick={(e) => { handleEmojiClick(e.emoji) }}
                      />:''
}

             <MdOutlineEmojiEmotions fontSize={30} color='grey' cursor={'pointer'} onClick={()=>{ cemoji?setemoji(false):setemoji(true)}}/>
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}

                />
              </Box>
            </FormControl>

          </Box>


        </> :
          (
            // to get socket.io on same page
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
              <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                Click on a user to start chatting
              </Text>
            </Box>
          )
      }

    </>
  )
}

export default SingleChat