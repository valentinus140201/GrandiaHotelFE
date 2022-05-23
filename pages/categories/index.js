import React from "react";
import Head from "next/head";
import * as api from "api";
import { Flex } from "@chakra-ui/react";
import { Header, GridListContainer } from "components/layout";
import { CategoryCardLarge } from "components/products";

const Categories = ({ categories }) => {
  return (
    <>
      <Head>
        <title>FooDY | Categories</title>
      </Head>

      <Flex mb={5}>
        <Header flex="1" title="See All Categories" />
      </Flex>

      <GridListContainer title="Category Lists">
        {categories.map((category, index) => {
          return <CategoryCardLarge key={index} category={category} />;
        })}
      </GridListContainer>
    </>
  );
};

export default Categories;

export async function getStaticProps() {
  const resCategory = await api.getCategoryList();
  const categories = await resCategory.data.categories;

  return {
    props: {
      categories
    }
  };
}
