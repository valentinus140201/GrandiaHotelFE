import React, { useState, useEffect } from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import axios from "axios";
import { Box, Text, Grid, GridItem, Flex, Button } from "@chakra-ui/react";

const childBox = css`
  &:nth-last-of-type(1) {
    margin-right: 0px;
  }
`;

const Banner = ({ item }) => {
  const { strMeal, strMealThumb, idMeal } = item;
  const [detail, setDetail] = useState({});

  const getDetailData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/lookup.php?i=${idMeal}`)
      .then((res) => {
        setDetail(res.data.meals[0]);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <Box
      w="700px"
      bg="white"
      h="300px"
      borderRadius="15px"
      display="inline-block"
      verticalAlign="top"
      marginRight="10px"
      mb={4}
      bgImage={`url(${strMealThumb})`}
      bgSize="cover"
      css={childBox}
    >
      <Box
        borderRadius="15px"
        style={{ backdropFilter: "brightness(25%)" }}
        h="100%"
      >
        <Grid
          templateColumns="repeat(5, 1fr)"
          h="100%"
          gap={2}
          p={4}
          whiteSpace="normal"
        >
          <GridItem colSpan={2}>
            <Flex alignItems="flex-end" h="100%">
              <Box mb={4}>
                <Link href={`/meals/detail/${idMeal}`}>
                  <Text
                    as="h4"
                    fontSize="3xl"
                    fontWeight="bold"
                    color="white"
                    transition="0.4s"
                    _hover={{ color: "gray.500", cursor: "pointer" }}
                  >
                    {strMeal.slice(0, 40)}
                    {strMeal.length > 40 ? "..." : null}
                  </Text>
                </Link>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="secondary.main"
                  mb={3}
                >
                  {detail.strArea}
                </Text>
                <a href={detail.strYoutube} target="_blank">
                  <Button
                    bg="primary.main"
                    color="gray.800"
                    _hover={{
                      background: "primary.dark",
                    }}
                    _active={{
                      background: "primary.dark",
                    }}
                  >
                    See Tutorial
                  </Button>
                </a>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={3}>
            <Box
              w="100%"
              h="100%"
              borderRadius="20px"
              bgImage={`url(${strMealThumb})`}
              bgSize="cover"
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Banner;
