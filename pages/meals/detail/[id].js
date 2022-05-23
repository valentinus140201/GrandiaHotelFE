import React from "react";
import Head from "next/head";
import * as api from "api";
import {
  Box,
  Text,
  HStack,
  VStack,
  Flex,
  Spacer,
  Button,
  useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";
import { BiListUl } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CgBowl } from "react-icons/cg";
import { AiFillYoutube } from "react-icons/ai";
import { Header, SidebarRight } from "components/layout";
import { ThumbCard } from "components/products";
import { IngredientLists, DescriptionCard } from "components/products/_detail";
import { FavouriteButton } from "components/common";

const DetailMeal = ({ meal, ingredients }) => {
  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube
  } = meal;

  const ingredientMeasure = [
    {
      ingredient: meal.strIngredient1 === null ? "" : meal.strIngredient1,
      measure: meal.strMeasure1 === null ? "" : meal.strMeasure1
    },
    {
      ingredient: meal.strIngredient2 === null ? "" : meal.strIngredient2,
      measure: meal.strMeasure2 === null ? "" : meal.strMeasure2
    },
    {
      ingredient: meal.strIngredient3 === null ? "" : meal.strIngredient3,
      measure: meal.strMeasure3 === null ? "" : meal.strMeasure3
    },
    {
      ingredient: meal.strIngredient4 === null ? "" : meal.strIngredient4,
      measure: meal.strMeasure4 === null ? "" : meal.strMeasure4
    },
    {
      ingredient: meal.strIngredient5 === null ? "" : meal.strIngredient5,
      measure: meal.strMeasure5 === null ? "" : meal.strMeasure5
    },
    {
      ingredient: meal.strIngredient6 === null ? "" : meal.strIngredient6,
      measure: meal.strMeasure6 === null ? "" : meal.strMeasure6
    },
    {
      ingredient: meal.strIngredient7 === null ? "" : meal.strIngredient7,
      measure: meal.strMeasure7 === null ? "" : meal.strMeasure7
    },
    {
      ingredient: meal.strIngredient8 === null ? "" : meal.strIngredient8,
      measure: meal.strMeasure8 === null ? "" : meal.strMeasure8
    },
    {
      ingredient: meal.strIngredient9 === null ? "" : meal.strIngredient9,
      measure: meal.strMeasure9 === null ? "" : meal.strMeasure9
    },
    {
      ingredient: meal.strIngredient10 === null ? "" : meal.strIngredient10,
      measure: meal.strMeasure10 === null ? "" : meal.strMeasure10
    },
    {
      ingredient: meal.strIngredient11 === null ? "" : meal.strIngredient11,
      measure: meal.strMeasure11 === null ? "" : meal.strMeasure11
    },
    {
      ingredient: meal.strIngredient12 === null ? "" : meal.strIngredient12,
      measure: meal.strMeasure12 === null ? "" : meal.strMeasure12
    },
    {
      ingredient: meal.strIngredient13 === null ? "" : meal.strIngredient13,
      measure: meal.strMeasure13 === null ? "" : meal.strMeasure13
    },
    {
      ingredient: meal.strIngredient14 === null ? "" : meal.strIngredient14,
      measure: meal.strMeasure14 === null ? "" : meal.strMeasure14
    },
    {
      ingredient: meal.strIngredient15 === null ? "" : meal.strIngredient15,
      measure: meal.strMeasure15 === null ? "" : meal.strMeasure15
    },
    {
      ingredient: meal.strIngredient16 === null ? "" : meal.strIngredient16,
      measure: meal.strMeasure16 === null ? "" : meal.strMeasure16
    },
    {
      ingredient: meal.strIngredient17 === null ? "" : meal.strIngredient17,
      measure: meal.strMeasure17 === null ? "" : meal.strMeasure17
    },
    {
      ingredient: meal.strIngredient18 === null ? "" : meal.strIngredient18,
      measure: meal.strMeasure18 === null ? "" : meal.strMeasure18
    },
    {
      ingredient: meal.strIngredient19 === null ? "" : meal.strIngredient19,
      measure: meal.strMeasure19 === null ? "" : meal.strMeasure19
    },
    {
      ingredient: meal.strIngredient20 === null ? "" : meal.strIngredient20,
      measure: meal.strMeasure20 === null ? "" : meal.strMeasure20
    }
  ];

  const tags = strTags !== null ? strTags.split(",") : null;

  return (
    <>
      <Head>
        <title>FooDY | {strMeal}</title>
      </Head>

      <Box
        mr={useBreakpointValue({
          base: "0px",
          lg: "450px"
        })}>
        <Header title={`${strMeal}`} />
        <Flex mt={2} mb={3}>
          <HStack spacing="2px">
            <BiListUl fontSize="24px" style={{ color: "#6a6a6a" }} />
            <Text color="secondary.main" fontWeight="600">
              {strCategory}
            </Text>
          </HStack>
          <Spacer />
          <HStack spacing="2px">
            <HiOutlineLocationMarker
              fontSize="24px"
              style={{ color: "#6a6a6a" }}
            />
            <Text color="secondary.main" fontWeight="600">
              {strArea}
            </Text>
          </HStack>
        </Flex>
        <ThumbCard my={2} image={strMealThumb} />

        <Flex mb={2} alignItems="center">
          <FavouriteButton
            fontSize="3xl"
            item={{
              idMeal,
              strMeal,
              strMealThumb
            }}
            isMeal
          />
          <Spacer />
          {strYoutube !== "" && (
            <a target="_blank" href={strYoutube}>
              <Button
                leftIcon={<AiFillYoutube fontSize="18px" />}
                bg="red.500"
                colorScheme="red">
                Youtube Tutorial
              </Button>
            </a>
          )}
        </Flex>

        <VStack spacing={4}>
          <DescriptionCard
            description={strInstructions}
            title="Instruction"
            icon={<CgBowl />}
            type="meal"
            tags={tags}
          />
          {useBreakpointValue({
            base: (
              <IngredientLists
                bg={useColorModeValue("white", "gray.800")}
                w="100%"
                p={4}
                borderRadius="15px"
                boxShadow="lg"
                ingredients={ingredients}
                ingredientMeasure={ingredientMeasure}
              />
            ),
            lg: <></>
          })}
        </VStack>
      </Box>

      {useBreakpointValue({
        base: <></>,
        lg: (
          <SidebarRight>
            <IngredientLists
              ingredients={ingredients}
              ingredientMeasure={ingredientMeasure}
            />
          </SidebarRight>
        )
      })}
    </>
  );
};

export default DetailMeal;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const resMeal = await api.getDetailMeal(id);
  const meal = await resMeal.data.meals[0];

  const resIngredients = await api.getIngredientList();
  const ingredients = await resIngredients.data.meals;

  return {
    props: {
      meal,
      ingredients
    }
  };
}
