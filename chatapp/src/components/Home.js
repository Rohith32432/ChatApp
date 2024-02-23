import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

function Home() {
    return (
        <Box
            display="flex"
            minHeight="100vh"
            backgroundImage="url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg)"
            backgroundSize="cover"
            justifyContent="center"
            alignItems="center"
        >
            <Container
                display="flex"
                flexDirection={{ base: 'column', lg: 'row' }}
                bg="white"
                width={{ base: '100%', sm: '90%' }}
                maxWidth="900px"
                p={5}
                borderRadius="lg"
                borderWidth="1px"
                boxShadow="0px 0px  2px gray"
                gap={5}
            >
                <Box
                    d="flex"
                    justifyContent="center"
                    p={3}
                    bg="white"
                    height="100%"
                    alignItems="center"
                    width={{ lg: '70%', sm: '100%' }}
                    m="40px 0 15px 0"
                >
                    <Text fontSize="4xl" fontFamily="revert-layer">
                        Let's Talk
                    </Text>
                </Box>
                <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                    <Tabs isFitted variant="soft-rounded" colorScheme="teal">
                        <TabList mb="1em">
                            <Tab fontSize="lg">Login</Tab>
                            <Tab fontSize="lg">Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </Box>
    );
}

export default Home;
