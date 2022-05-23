import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const apiMeal = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1"
});

const apiUser = axios.create({
  baseURL: "https://api-user-themealdb.herokuapp.com"
});

apiUser.interceptors.request.use((req) => {
  const userData = JSON.parse(localStorage.getItem("user-data"));

  if (userData.result) {
    req.headers.Authorization = `Bearer ${userData.token}`;
  }

  return req;
});

//Meal
export const getMealsByCategory = (category) => {
  return apiMeal.get(`/filter.php?c=${category}`);
};

export const getMealsByIngredient = (ingredient) => {
  return apiMeal.get(`/filter.php?i=${ingredient}`);
};

export const getDetailMeal = (id) => {
  return apiMeal.get(`/lookup.php?i=${id}`);
};

export const searchMeals = (searchValue) => {
  return apiMeal.get(`/search.php?s=${searchValue}`);
};

//Ingredient
export const getIngredientList = () => {
  return apiMeal.get("/list.php?i=list");
};

//Category
export const getCategoryList = () => {
  return apiMeal.get("/categories.php");
};

//Auth
export const signIn = (inputValue) => {
  return axios.post(
    "https://api-user-themealdb.herokuapp.com/user/sign-in",
    inputValue
  );
};

export const signUp = (inputValue) => {
  return axios.post(
    "https://api-user-themealdb.herokuapp.com/user/sign-up",
    inputValue
  );
};

export const deleteAccount = (id) => {
  return apiUser.delete(`/user/${id}`);
};

//Favourites Meal
export const getFavMeals = () => {
  return apiUser.get("/favourites/meals");
};

export const addFavMeal = (value) => {
  return apiUser.post("/favourites/meals", value);
};

export const removeFavMeal = (id) => {
  return apiUser.delete(`/favourites/meals/${id}`);
};

//Favourites Ingredients
export const getFavIngredients = () => {
  return apiUser.get("/favourites/ingredients");
};

export const addFavIngredient = (value) => {
  return apiUser.post("/favourites/ingredients", value);
};

export const removeFavIngredient = (id) => {
  return apiUser.delete(`/favourites/ingredients/${id}`);
};
