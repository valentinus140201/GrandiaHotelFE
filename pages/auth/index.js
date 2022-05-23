import React, { useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  Center,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";
import { UserContext } from "context/userContext";
import { Register, Login } from "components/auth";

const Auth = () => {
  const { userData } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (userData?.isLoggedIn) {
      router.push("/");
    }
  }, [userData]);

  return (
    <>
      <Head>
        <title>Grandia | Auth</title>
      </Head>

      {useBreakpointValue({
        base: (
          <Center mb={4}>
            <Image src="assets/images/logo/logo.jpg" alt="logo" h="100px" />
          </Center>
        ),
        md: <></>
      })}
      <Box
        bgColor={useColorModeValue("white", "gray.800")}
        borderRadius="15px"
        boxShadow="xl">
        <Stack
          direction={useBreakpointValue({ base: "column", md: "row" })}
          spacing={0}>
          <Box
            minHeight="80vh"
            w={useBreakpointValue({ base: "100%", md: "50%" })}
            borderLeftRadius="15px">
            <Tabs isFitted>
              <TabList
                borderTopLeftRadius="15px"
                borderTopRightRadius={useBreakpointValue({
                  base: "15px",
                  md: "0px"
                })}
                bgColor={useColorModeValue("gray.200", "gray.900")}>
                <Tab
                  _selected={{
                    borderColor: "primary.main"
                  }}
                  _focus={{ outline: "none" }}>
                  <Text fontWeight="bold">Sign In</Text>
                </Tab>
                <Tab
                  _selected={{
                    borderColor: "primary.main"
                  }}
                  _focus={{ outline: "none" }}>
                  <Text fontWeight="bold">Sign Up</Text>
                </Tab>
              </TabList>
              <TabPanels p={4}>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Register />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Center
            display={useBreakpointValue({ base: "none", md: "flex" })}
            minHeight="80vh"
            w={useBreakpointValue({ base: "100%", md: "50%" })}
            bgColor="primary.main"
            borderRightRadius="15px">
            {useBreakpointValue({
              base: <></>,
              md: (
                <Box bg="white" borderRadius="15px" p={4}>
                  <Image src="/assets/images/logo/logo.jpg" alt="logo" />
                </Box>
              )
            })}
          </Center>
        </Stack>
      </Box>
    </>
  );
};

export default Auth;
