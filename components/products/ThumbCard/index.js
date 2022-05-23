import React from "react";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";

const ThumbCard = ({ image, ...props }) => {
  return (
    <Box
      {...props}
      w="100%"
      h="300px"
      bgImage={`url(${image})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="15px">
      <Box
        w="100%"
        h="100%"
        style={{ backdropFilter: "brightness(25%)" }}
        borderRadius="15px"
        p={4}>
        <Image
          bgColor={useColorModeValue("white", "gray.800")}
          src={image}
          maxHeight="100%"
          borderRadius="15px"
          boxShadow="lg"
        />
      </Box>
    </Box>
  );
};

export default ThumbCard;
