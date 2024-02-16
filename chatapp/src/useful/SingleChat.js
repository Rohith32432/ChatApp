import React, { useState } from 'react'
import{ ChatState } from '../Context/context'
import { Box, IconButton, Text } from '@chakra-ui/react'

import { FaArrowLeft } from "react-icons/fa";
import { getSender, getSenderFull } from './chatlogic';
import ProfileModal from '../components/miscellaneous/ProfileModal';
import UpdateGroupModel from '../components/Groups/UpdateGroupModel';

function SingleChat({fetchAgain,setFetchAgain}) {
    const [messages, setMessages] = useState([]);
    const {user,selectedChat,setSelectedChat}=ChatState()

  return (
    <>
        {
            selectedChat?<>
             <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
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
                    {getSender(user, selectedChat.users)}
                    <ProfileModal
                      user={getSenderFull(user, selectedChat.users)}
                    />
                  </>
                ) : (
                  <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupModel
                    
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                  </>
                ))}
            </Text>
            <Box 
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-end'}
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            >
                    message here

            </Box>
            
            </>:
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