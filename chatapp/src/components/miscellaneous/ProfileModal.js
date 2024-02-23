import { IoEye } from "react-icons/io5";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Flex,
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<IoEye />} onClick={onOpen} />
      )}

      <Modal size="lg" onClose={onClose} isOpen={isOpen}  isCentered>
        <ModalOverlay />
        <ModalContent h="400" w={400} borderRadius={10} overflow={'hidden'} >
          <ModalCloseButton fontSize={20} />
          <ModalBody p={0} boxSizing="border-box" >
            
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Image width={'100%'} height={250} objectFit={'cover'} src={user.pic} alt={user.name} />
              <Box padding={3}  alignSelf={'flex-start'} >
                <Text fontSize={23} as={'b'}>{user.name}</Text>
                <Text fontSize={20}  >
                   {user.email}
                </Text>
              </Box>
              </Box>
           
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
