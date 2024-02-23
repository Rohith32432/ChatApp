import { IoMdAdd } from "react-icons/io";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { filteruser, getSender, getpic } from "../useful/chatlogic";
import ChatLoading from "./Loading";
import { Button, Image, Circle,Center, Input } from "@chakra-ui/react";
import { ChatState } from "../Context/context";
import Groupmodel from "./Groups/groupmodel";
import { FaUniversalAccess } from "react-icons/fa";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats,categry } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:2021/api/chat", config);

      setChats(data);
      // console.log(data.filter((e)=>e.isGroupChat===true));
      categry? setChats(data):setChats(
        data.filter((e)=>e.isGroupChat===true)
      )
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const search = (e) => {
    const name = e.target.value
    filteruser(name,chats)

  };
  
  
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain,categry]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      width={{ base: "100%", md: "31%" }}
      height={'100%'}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Input
                placeholder="Search by name or email"
                onChange={search}
              />
        <>
          <Groupmodel>
            <Button
              display="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<IoMdAdd />}
            >
              New Group Chat
            </Button>
          </Groupmodel>
        </>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        h="100%"
        width={'100%'}
        borderRadius="lg"
      >
        {chats ? (
          <Stack overflowY={'scroll'} >
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                borderRadius="lg"
                p={1}
                display={'flex'}
                gap={5}
                alignItems={'center'}
                key={chat._id}
              >
                <Circle size='55px' bg='grey' color='white' overflow={'hidden'} textAlign={'center'}>
                  { 
                   !chat.isGroupChat ?
                  <Image src={getpic(loggedUser, chat.users)
                  } alt="naruto"
                    height={'100%'}
                    objectFit={'cover'}
                  />: 
                  <Text fontSize={30} align={'center'} >  {chat.chatName[0].toUpperCase()}</Text>
                }
                </Circle>

                <Box textAlign={'start'} >
                  <Text fontSize={18} as={'b'} >
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
            
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;