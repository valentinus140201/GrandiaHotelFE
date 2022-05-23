import React from "react";
import {
  Box,
  Text,
  Center,
  HStack,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import HeaderMedium from "components/common/HeaderMedium";

const DescriptionCard = ({ description, title, icon, type, tags }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      w="100%"
      p={4}
      borderRadius="15px"
      boxShadow="lg"
    >
      <HeaderMedium title={title} icon={icon} />
      <Box mb={4}>
        {description !== null ? (
          <Text fontSize="md">{description}</Text>
        ) : (
          <Center height="100px">
            <Text color="gray.400">No description about this {type}.</Text>
          </Center>
        )}
      </Box>

      {tags !== undefined && tags !== null && (
        <>
          <Text fontSize="sm" mb={2}>
            Tags:
          </Text>
          <HStack flexWrap="wrap">
            {tags.map((tag, index) => {
              return (
                <Box key={index}>
                  <Tag
                    size="sm"
                    variant="solid"
                    bg="primary.main"
                    color="gray.800"
                    ml="0px"
                  >
                    {tag}
                  </Tag>
                </Box>
              );
            })}
          </HStack>
        </>
      )}
    </Box>
  );
};

export default DescriptionCard;
