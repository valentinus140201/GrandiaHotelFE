import React, { useState, useEffect } from "react";
import * as api from "api";
import Head from "next/head";
import {
  Center,
  CircularProgress,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue
} from "@chakra-ui/react";
import {
  Header,
  HorizontalListContainer,
  GridListContainer
} from "components/layout";
import { Search, CategoryCard, MealCard } from "components/products";

const Meals = ({ categories }) => {
  const [currentCategory, setCurrentCategory] = useState("Beef");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const fetchMeals = async (currentCategory) => {
    setLoading(true);

    try {
      const { data } = await api.getMealsByCategory(currentCategory);
      setMeals(data.meals);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const fetchSearch = async (inputValue) => {
    setCurrentCategory("");
    setLoading(true);

    try {
      const { data } = await api.searchMeals(inputValue);
      setMeals(data.meals);
      setLoading(false);
    } catch (error) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    fetchMeals(category);
  };

  useEffect(() => {
    fetchMeals(currentCategory);
  }, [currentCategory]);

  return (
    <>
      <Head>
        <title>Grandia Hotel | Drinks</title>
      </Head>

      <Stack direction={useBreakpointValue({ base: "column", md: "row" })}>
        <Header flex="1" title="Find and Explore the Meals You Want" />
        <Search fetchSearch={fetchSearch} />
      </Stack>

      <HorizontalListContainer>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
            currentCategory={currentCategory}
            handleCategoryClick={handleCategoryClick}
          />
        ))}
      </HorizontalListContainer>

      {loading ? (
        <Center>
          <CircularProgress
            mt="20px"
            size="70px"
            isIndeterminate
            color="secondary.main"
          />
        </Center>
      ) : errorMessage ? (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={6}
          borderRadius="15px"
          w="100%">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Search Meals Failed
          </AlertTitle>
          <AlertDescription maxWidth="sm">{errorMessage}</AlertDescription>
        </Alert>
      ) : meals === null ? (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={6}
          borderRadius="15px"
          w="100%">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Search Meals Failed
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Your search keyword doesn't match in our drink lists. Please input
            another keyword.
          </AlertDescription>
        </Alert>
      ) : (
        <GridListContainer
          title={`Meals ${
            currentCategory !== "" ? `for ${currentCategory}` : "Lists"
          }`}>
          {meals.map((meal, index) => (
            <MealCard key={index} item={meal} />
          ))}
        </GridListContainer>
      )}
    </>
  );
};

export default Meals;

export async function getStaticProps() {
  const resCategory = await api.getCategoryList();
  const categories = await resCategory.data.categories;

  return {
    props: {
      categories
    }
  };
}
