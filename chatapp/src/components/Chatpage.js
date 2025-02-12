import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/Mycharts";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/context";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      <Box
        display={'flex'}
        flexDirection={{ lg: 'row', base:'column'}}
       
        overflow={'hidden'}
        gap={1}
      >
        <Box  
           display={'flex'}
           flexDirection={{ lg: 'row', base:'column'}}
         
           gap={1}
        >
      {user && <SideDrawer />}
          </Box>      
        <Box display="flex"
          justifyContent="space-between" w="100%" h="100vh" p={1} >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </Box>

    </div>
  );
};

export default Chatpage;