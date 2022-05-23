import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import * as api from "api";
import { useRouter } from "next/router";
import {
  Flex,
  Text,
  Box,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Button,
  useBreakpointValue
} from "@chakra-ui/react";
import { Header, GridListContainer } from "components/layout";
import { MealCard } from "components/products";
import { UserContext } from "context/userContext";

const Favourites = () => {
  const { userData } = useContext(UserContext);
  const [favouritesMeal, setFavouritesMeal] = useState([]);
  const router = useRouter();
  const isLoggedIn = userData?.isLoggedIn;

  const getFavMeals = async () => {
    try {
      const { data } = await api.getFavMeals();
      setFavouritesMeal(data.meals);
    } catch (error) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getFavMeals();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>FooDY | Favourites</title>
      </Head>

      <Flex mb={useBreakpointValue({ base: 0, lg: 5 })}>
        <Header flex="1" title="Your Favourites" />
      </Flex>

      {isLoggedIn ? (
        <>
          <Box mb={6}>
            {favouritesMeal.length > 0 ? (
              <GridListContainer title="Favourites Meal">
                {favouritesMeal.map((fav, index) => (
                  <MealCard key={index} item={fav} />
                ))}
              </GridListContainer>
            ) : (
              <Alert
                status="warning"
                variant="subtle"
                borderRadius="15px"
                w="100%">
                <AlertIcon />
                You don't have favourites meal.
              </Alert>
            )}
          </Box>
        </>
      ) : (
        <Alert
          status="warning"
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
            Authentication Needed
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            <Text mb={4}>
              You need login your account to see your favourites.
            </Text>
            <Button colorScheme="orange" onClick={() => router.push("/auth")}>
              Login Now
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default Favourites;
