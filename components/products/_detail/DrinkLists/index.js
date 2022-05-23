import React from "react";
import { Grid, Center, Text, Box } from "@chakra-ui/react";
import { BiFoodMenu } from "react-icons/bi";
import HeaderMedium from "components/common/HeaderMedium";
import MealCard from "components/products/MealCard";

const MealLists = ({ title, meals, type, ...props }) => {
  return (
    <Box {...props}>
      <HeaderMedium title={title} icon={<BiFoodMenu />} />
      {meals !== null ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          {meals.map((meal, index) => {
            return <MealCard key={index} item={meal} />;
          })}
        </Grid>
      ) : (
        <Center>
          <Text color="gray.400">No meals with this {type}.</Text>
        </Center>
      )}
    </Box>
  );
};

export default MealLists;
