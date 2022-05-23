import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { useRouter } from "next/router";
import { UserContext } from "context/userContext";
import { FavouritesContext } from "context/favouritesContext";
import {
  Box,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Button,
  useToast,
  useDisclosure
} from "@chakra-ui/react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import {
  addFavMeal,
  removeFavMeal,
  // addFavDrink,
  // removeFavDrink,
} from "utils/favourites";

const FavouriteButton = ({ item, isMeal/*isDrink*/, ...props }) => {
  const router = useRouter();
  const cancelRef = useRef();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favMeals, setFavMeals } =
    useContext(FavouritesContext);
  const { userData } = useContext(UserContext);
  const [favourite, setFavourite] = useState({
    isFavourite: false,
    id: "0"
  });

  const handleSetFavourite = () => {
    if (!favourite.isFavourite) {
      if (isMeal) {
        const { strMeal, strMealThumb, idMeal } = item;
        const value = {
          strMeal,
          strMealThumb,
          idMeal
        };
        addFavMeal(value, favMeals, setFavMeals, toast, setFavourite);
      }

      // if (isDrink) {
      //   const { strDrink, strMealThumb, idDrink } = item;
      //   const value = {
      //     strDrink,
      //     strDrinkThumb,
      //     idDrink
      //   };
      //   addFavMeal(value, favDrinks, setFavDrinks, toast, setFavourite);
      // }
    } else {
      if (isMeal) {
        removeFavMeal(favourite.id, favMeals, setFavMeals, toast, setFavourite);
      }
      // if (isDrink) {
      //   removeFavMeal(favourite.id, favDrinks, setFavDrinks, toast, setFavourite);
      // }
    }
  };

  const handleFavouriteClick = () => {
    if (!userData?.isLoggedIn) {
      onOpen();
    } else {
      handleSetFavourite();
    }
  };

  const filterMeals = useCallback(() => {
    return favMeals.filter((fav) => {
      if (fav.idMeal === item.idMeal) {
        return setFavourite({
          isFavourite: true,
          id: fav._id
        });
      }
    });
  }, [favMeals]);

  // const filterDrinks = useCallback(() => {
  //   return favDrinks.filter((fav) => {
  //     if (fav.idDrink === item.idDrink) {
  //       return setFavourite({
  //         isFavourite: true,
  //         id: fav._id
  //       });
  //     }
  //   });
  // }, [favDrinks]);

  useEffect(() => {
    if (!userData?.isLoggedIn) {
      return setFavourite({
        isFavourite: false,
        id: "0"
      });
    }

    if (isMeal) {
      filterMeals();
    }

    if (isDrink) {
      filterDrinks();
    }
    
  }, [userData?.isLoggedIn, isMeal, /* isDrinks, */ filterMeals]);

  return (
    <Box {...props}>
      <Box onClick={handleFavouriteClick}>
        <Text cursor="pointer">
          {favourite.isFavourite ? (
            <HiHeart style={{ color: "#d33" }} />
          ) : (
            <HiOutlineHeart />
          )}
        </Text>
      </Box>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent mx={4}>
          <AlertDialogHeader>Authentication Needed</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You must login to your account to add or remove favourites.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              bgColor="secondary.main"
              _hover={{ background: "secondary.light" }}
              _active={{ background: "secondary.dark" }}
              color="black"
              ref={cancelRef}
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => router.push("/auth")}
              bgColor="primary.main"
              _hover={{ background: "primary.light" }}
              _active={{ background: "primary.dark" }}
              color="black"
              ml={3}>
              Login Now
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default FavouriteButton;
