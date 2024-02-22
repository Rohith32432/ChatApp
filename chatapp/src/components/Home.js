import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, } from "@chakra-ui/react";

import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

function Home() {

    return (
        <Box

            display={'flex'}
            justifyContent={'center'}
            height={'100vh'}
            width={'100%'}
            alignItems={'center'}
        >
            <Box display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Box
                    d="flex"
                    justifyContent="center"
                    p={3}
                    bg="white"
                    w="100%"
                    m="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    <Text fontSize="4xl" fontFamily={'revert-layer'}>
                        Talk-A-Tive
                    </Text>
                </Box>
                <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                    <Tabs isFitted variant="soft-rounded">
                        <TabList mb="1em">
                            <Tab>Login</Tab>
                            <Tab>Sign Up</Tab>
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
            </Box>

        </Box>
    );
}

export default Home;