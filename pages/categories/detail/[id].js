import React from "react";
import Head from "next/head";
import * as api from "api";
import {
  Box,
  VStack,
  useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";
import { GrTextAlignLeft } from "react-icons/gr";
import { SidebarRight, Header } from "components/layout";
import { ThumbCard } from "components/products";
import { MealLists, DescriptionCard } from "components/products/_detail";

const DetailCategory = ({ category, recommendationMeals }) => {
  const dataCategory = category[0];
  const { strCategory, strCategoryThumb, idCategory, strCategoryDescription } =
    dataCategory;

  return (
    <>
      <Head>
        <title>FooDY | {strCategory}</title>
      </Head>

      <Box
        mr={useBreakpointValue({
          base: "0px",
          lg: "450px"
        })}>
        <Header title={strCategory} />
        <ThumbCard my={2} image={strCategoryThumb} />
        <VStack spacing={4}>
          <DescriptionCard
            description={strCategoryDescription}
            title="Description"
            icon={<GrTextAlignLeft />}
            type="category"
          />
          {useBreakpointValue({
            base: (
              <MealLists
                bg={useColorModeValue("white", "gray.800")}
                w="100%"
                p={4}
                borderRadius="15px"
                boxShadow="lg"
                title={`Meals in Category ${strCategory}`}
                meals={recommendationMeals}
                type="category"
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
            <MealLists
              title={`Meals in Category ${strCategory}`}
              meals={recommendationMeals}
              type="category"
            />
          </SidebarRight>
        )
      })}
    </>
  );
};

export default DetailCategory;

export async function getServerSideProps(context) {
  const resCategories = await api.getCategoryList();
  const categories = await resCategories.data.categories;
  const category = categories.filter((category) => {
    return category.idCategory === context.params.id;
  });

  const categoryName = category[0].strCategory;
  const resRecommendation = await api.getMealsByCategory(categoryName);
  const recommendationMeals = await resRecommendation.data.meals;

  return {
    props: {
      category,
      recommendationMeals
    }
  };
}
