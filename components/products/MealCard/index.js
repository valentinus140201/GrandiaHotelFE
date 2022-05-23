import React from "react";
import Link from "next/link";
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import FavouriteButton from "components/common/FavouriteButton";

const MealCard = ({ item }) => {
  const { strMeal, strMealThumb, idMeal } = item;

  return (
    <Box w="100%">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        borderRadius="10px"
        p={4}
        boxShadow="md"
        mb={1}>
        <Box
          bgImage={`url(${strMealThumb})`}
          bgSize="cover"
          h="120px"
          w="100%"
          borderRadius="10px"
        />
        <Flex pt={1} justifyContent="flex-end">
          <Box fontSize="xl">
            <FavouriteButton item={item} isMeal />
          </Box>
        </Flex>
      </Box>
      <Link href={`/meals/detail/${idMeal}`}>
        <Text
          w="100%"
          px={1}
          fontSize="md"
          fontWeight="500"
          transition="all 0.3s"
          _hover={{ color: "secondary.main", cursor: "pointer" }}>
          {strMeal}
        </Text>
      </Link>
    </Box>
  );
};

export default MealCard;
