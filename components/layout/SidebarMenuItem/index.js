import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

const SidebarMenuItem = ({ icon, label, isActive, ...props }) => {
  return (
    <Box
      {...props}
      borderRadius="15px"
      px="16px"
      py="12px"
      mb="6px"
      color={isActive && "black"}
      transition="all 0.3s"
      _hover={{
        background: "primary.light",
        cursor: "pointer",
        color: "black"
      }}
      bg={isActive ? "primary.main" : "transparent"}>
      <HStack>
        <Text fontSize="2xl">{icon}</Text>

        <Text fontSize="sm" fontWeight="bold">
          {label}
        </Text>
      </HStack>
    </Box>
  );
};

export default SidebarMenuItem;
