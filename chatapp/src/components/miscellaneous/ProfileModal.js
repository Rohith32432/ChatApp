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
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader fontSize="40px" fontFamily="Work sans" d="flex" justifyContent="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={ "column"} alignItems="center" justifyContent="space-between">
              <Box>
                <Image borderRadius="full" boxSize="150px" src={user.pic} alt={user.name} />
              </Box>
              <Box>
                <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">
                  Email: {user.email}
                </Text>
              </Box>
            </Flex>
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
