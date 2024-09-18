import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { IoIosLogOut } from "react-icons/io";
import { FaAngleDown, FaBell, FaSearch } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/tooltip";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import UserListItem from "./Avatar/UserListItem";
import { ChatState } from "../../Context/context";
// import { getSender } from "../../useful/chatlogic";
// import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
// import { Effect } from "react-notification-badge";
import { HiUserGroup } from "react-icons/hi2";
import { PiChatsFill } from "react-icons/pi";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const url=process.env.REACT_APP_API_URL
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
    categry,setcategory
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history("/");
  };

  const handleSearch = async (str) => {
      setSearch(str)
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${url}/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${url}/api/chat`, { userId }, config);
      console.log(data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{sm:'row',lg:'column'}}
        padding={1}
        margin={{base:2, lg:'15px 0px'}}
        
        alignItems="center"
        bg="white" 
        overflow={'hidden'}
      >
        <Box display={'flex'}  flexDirection={{base:'row',lg:'column'}} justifyContent={{base:'space-between'}}
        gap={{base:5}}
        >     
          
            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen} display="flex" alignItems="center">
            <FaSearch  fontSize={20} />
            <Text display={{ base: "none", md: "inline-block"  ,lg:"none"}} ml="2">
              Search User
            </Text>
          </Button>
        </Tooltip>
       
       
      <Button  variant={'ghost'} isActive={categry} onClick={()=>{setcategory(true)}}><PiChatsFill fontSize={30} color={categry?'green':''}/></Button>
      <Button variant={'ghost'} isActive={!categry} onClick={()=>{setcategory(false)}} ><HiUserGroup  fontSize={30}  color={!categry?'green':''}/></Button>
        
        </Box>
        <Box display={'flex'}   
         flexDirection={{base:'row',lg:'column'}}
        alignItems={'center'}
        gap={3}
        >
        <Menu>
          <MenuButton fontSize={'xl'} marginBottom={{lg:5}} >
            {/* <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
              style={{ marginRight: '8px' }}
            /> */}
            <FaBell fontSize="2xl" />
          </MenuButton>
          <MenuList >
            {/* {!notification.length && <MenuItem>No New Messages</MenuItem>}
            {notification.map((notif) => (
              <MenuItem
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </MenuItem>
            ))} */}
            <MenuItem>No New Messages</MenuItem>
          </MenuList>
        </Menu>
       
        <Menu>
            <ProfileModal user={user}>
              <> <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} /></>
            </ProfileModal>
        
            <Button _hover={{color:'red'}} variant="ghost" cursor={'pointer'} onClick={logoutHandler} fontSize={26}  ><IoIosLogOut  strokeWidth={15} /></Button>
           
         
        </Menu>
       
      </Box>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e)=>{handleSearch(e.target.value)}}
              />
              <Button colorScheme="green" onClick={()=>{handleSearch('')}}>ViewAll</Button>
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
