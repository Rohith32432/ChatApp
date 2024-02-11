import { IoClose } from "react-icons/io5";
import { Badge } from "@chakra-ui/layout";

const BadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      display={'flex'}
      alignItems={'center'}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <IoClose pl={1} size={15} />
    </Badge>
  );
};

export default BadgeItem;