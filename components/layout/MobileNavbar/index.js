import React from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import SidebarContent from "components/layout/SidebarContent";

const MobileNavbar = ({ menuItems }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="fixed"
      top="0px"
      left="0px"
      right="0px"
      zIndex="1000"
      bgColor={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
      p={2}>
      <Flex justifyContent="center">
        <Center ml={2} mr={4} _hover={{ cursor: "pointer" }} onClick={onOpen}>
          <Text fontSize="2xl">
            <HiMenu />
          </Text>
        </Center>
        <Box flex="1">
          <Box
            bg="white"
            py={1}
            ml="auto"
            maxWidth="120px"
            borderRadius="8px"
            border="1px solid"
            borderColor="gray.300">
            <Image
              h="25px"
              mx="auto"
              src="/assets/images/logo/logo.jpg"
              alt="logo"
            />
          </Box>
        </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerBody display="flex" flexDirection="column">
                <SidebarContent menuItems={menuItems} />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default MobileNavbar;
