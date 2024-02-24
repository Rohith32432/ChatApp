import React, { useState } from 'react';
import { Container, Flex, IconButton, Square } from '@chakra-ui/react';
import { FaSearchengin } from 'react-icons/fa';
import { AspectRatio, Image } from '@chakra-ui/react';
import { Heading, useColorMode, useColorModeValue, Box, Button } from '@chakra-ui/react';
import EmojiPicker from 'emoji-picker-react';

// import {}
function Sample() {
  const { toggleColorMode } = useColorMode();

  const bg = useColorModeValue('red.500', 'red.200');
  const colors = useColorModeValue('white', 'gray.800');
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const handleEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  return (
    <div>
      <EmojiPicker/>
      Sample
      <Heading size={'4xl'} color={colors}>
        Rohith
      </Heading>
      <Box mb={4} bg={bg} color={colors}>
        This box's style will change based on the color mode.
      </Box>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
      <Button mx={5} onClick={toggleColorMode}>
        testing
      </Button>
      <IconButton color={'#fff'} variant="outline" aria-label="Search database" icon={<FaSearchengin />} />
      <Flex className="outer-container" h="100vh" w="100%" justifyContent="center" alignItems="center" color="aliceblue">
        <Flex className="inner-container" w="80%" h="100%" justifyContent="space-between">
          <Box className="side1" h="100%" w="10%" bgColor="rgb(41, 41, 41)">
            side1
          </Box>
          <Box className="side2" h="100%" w="30%" bgColor="rgb(69, 69, 69)">
            side2
          </Box>
          <Box className="side3" h="100%" w="60%"  bgColor="rgb(94, 94, 94)">
            <Box height={'100%'} className='message'>
            <Box  display={'flex'} justifyContent={'end'}  m={5}  > <Box bg={'green'} p={2}> kmkm</Box></Box>
            <Box   display={'flex'} justifyContent={'start'}  m={5} bg={bg} w={'max-content'}> kkk</Box>
            <Box   display={'flex'} justifyContent={'end'}  m={5} bg={bg} w={'max-content'}> kkk</Box>
          </Box></Box>
        </Flex>
        <AspectRatio maxW="100px" ratio={16 / 9}>
          <Image src="https://bit.ly/naruto-sage" alt="naruto" objectFit="cover" />
        </AspectRatio>
      </Flex>
    </div>
  );
}

export default Sample;
