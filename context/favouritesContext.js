import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback
} from "react";
import * as api from "api";
import { UserContext } from "context/userContext";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favMeals, setFavMeals] = useState([]);
  const [favIngredients, setFavIngredients] = useState([]);

  const { userData } = useContext(UserContext);

  const getFavMeals = useCallback(async () => {
    try {
      const { data } = await api.getFavMeals();
      setFavMeals(data.meals);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const getFavIngredients = useCallback(async () => {
    try {
      const { data } = await api.getFavIngredients();
      setFavIngredients(data.ingredients);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (userData?.result?._id) {
      getFavMeals();
      getFavIngredients();
    }
  }, [userData?.result?._id, getFavMeals, getFavIngredients]);

  return (
    <FavouritesContext.Provider
      value={{
        favMeals,
        setFavMeals,
        favIngredients,
        setFavIngredients
      }}>
      {children}
    </FavouritesContext.Provider>
  );
};
