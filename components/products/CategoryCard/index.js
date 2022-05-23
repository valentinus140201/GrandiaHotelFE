import React from "react";
import { Box, Text, VStack, Center, useColorModeValue } from "@chakra-ui/react";

const CategoryCard = ({ category, currentCategory, handleCategoryClick }) => {
  const { strCategory, strCategoryThumb } = category;

  return (
    <Box
      bg={
        currentCategory === strCategory
          ? "primary.main"
          : useColorModeValue("white", "gray.800")
      }
      boxShadow="md"
      color={currentCategory === strCategory && "black"}
      w="100px"
      minHeight="100px"
      mx={2}
      my={4}
      display="inline-block"
      verticalAlign="top"
      borderRadius="10px"
      transition="all 0.4s"
      p={3}
      _hover={{
        cursor: "pointer",
        transform: "scale(1.1)",
      }}
      _active={{
        transform: "scale(0.9)",
      }}
      onClick={() => handleCategoryClick(strCategory)}
    >
      <VStack>
        <Center>
          <Box
            w="45px"
            h="45px"
            borderRadius="50%"
            mb={1}
            bgColor="white"
            bgImage={`url(${strCategoryThumb})`}
            bgSize="cover"
            bgPosition="center"
          />
        </Center>
        <Text isTruncated fontSize="xs" fontWeight="600">
          {strCategory}
        </Text>
      </VStack>
    </Box>
  );
};

export default CategoryCard;
