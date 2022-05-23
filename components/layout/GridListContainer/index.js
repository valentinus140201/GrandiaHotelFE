import React from "react";
import Link from "next/link";
import {
  Heading,
  Text,
  Grid,
  Flex,
  Box,
  useBreakpointValue
} from "@chakra-ui/react";
import { ImArrowRight2 } from "react-icons/im";

const MenuList = ({ children, title, moreLink, ...props }) => {
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(5, 1fr)",
    "2xl": "repeat(6, 1fr)"
  });

  return (
    <Box {...props}>
      <Flex>
        <Heading flex="1" as="h3" fontSize="xl" fontFamily="body" mb={4}>
          {title ? title : "Title"}
        </Heading>
        {moreLink && (
          <Link href={moreLink}>
            <Box
              transition="all 0.5s"
              cursor="pointer"
              _hover={{
                color: "secondary.main"
              }}>
              <Flex alignItems="center">
                <Text fontWeight="bold" mr="4px">
                  More
                </Text>
                <ImArrowRight2 fontWeight="bold" />
              </Flex>
            </Box>
          </Link>
        )}
      </Flex>

      <Grid templateColumns={gridTemplateColumns} gap={4}>
        {children}
      </Grid>
    </Box>
  );
};

export default MenuList;
