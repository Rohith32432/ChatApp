import React from 'react';
import { ChatState } from '../Context/context';
import { Box } from '@chakra-ui/react';
import SingleChat from '../useful/SingleChat';

function Chatbox({fetchAgain,setFetchAgain}) {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      padding={3}
      backgroundColor="white"
      width={{ base: "100%", md: "68%" }}

      flex={1}
      overflow={'hidden'}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}

export default Chatbox;
