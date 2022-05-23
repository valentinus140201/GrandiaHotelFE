import React, { useContext } from "react";
import { UserContext } from "context/userContext";
import { FavouritesContext } from "context/favouritesContext";
import {
  Box,
  Text,
  Center,
  Flex,
  Spacer,
  Avatar,
  Divider,
  useColorModeValue
} from "@chakra-ui/react";
import { FaUserTag } from "react-icons/fa";
import HeaderMedium from "components/common/HeaderMedium";

const ProfileCard = ({ ...props }) => {
  const { userData } = useContext(UserContext);
  const { favMeals, favIngredients } = useContext(FavouritesContext);
  const profileName = `${userData?.result?.firstName} ${userData?.result?.lastName}`;
  const profileEmail = userData?.result?.email;

  return (
    <Box
      {...props}
      p={6}
      borderRadius="15px"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="lg">
      <HeaderMedium title="Your Profile" icon={<FaUserTag />} />
      <Center mb={4}>
        <Avatar bg="primary.main" color="black" size="xl" name={profileName} />
      </Center>
      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          {profileName}
        </Text>
        <Text>{profileEmail}</Text>
      </Box>
      <Divider mt={5} mb={2} borderWidth="1px" borderColor="secondary.main" />
      <Text fontSize="lg" fontWeight="600">
        Favourites
      </Text>
      <Divider my={2} />
      <Flex>
        <Text color="gray.500">Meals</Text>
        <Spacer />
        <Text>{favMeals.length}</Text>
      </Flex>
      <Divider my={2} />
      <Flex>
        <Text color="gray.500">Ingredients</Text>
        <Spacer />
        <Text>{favIngredients.length}</Text>
      </Flex>
      <Divider my={2} />
    </Box>
  );
};

export default ProfileCard;
