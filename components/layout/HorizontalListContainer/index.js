import React from "react";
import { Box } from "@chakra-ui/react";

const HorizontalListContainer = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      overflow="auto"
      whiteSpace="nowrap"
      mb={3}
      sx={{
        "&::-webkit-scrollbar": {
          height: "10px",
          borderRadius: "8px",
          backgroundColor: "gray.300"
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "8px",
          backgroundColor: "primary.main"
        }
      }}>
      {children}
    </Box>
  );
};

export default HorizontalListContainer;
