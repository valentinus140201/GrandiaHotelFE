import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

const SidebarRight = ({ children }) => {
  return (
    <Box
      position="fixed"
      width="450px"
      bottom="0"
      right="0"
      top="0"
      bg={useColorModeValue("white", "gray.800")}
      p={6}
      boxShadow="2xl"
      borderLeft="3px solid"
      borderColor="primary.main"
      overflow="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "8px",
          borderRadius: "8px",
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "8px",
          backgroundColor: "primary.main",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default SidebarRight;
