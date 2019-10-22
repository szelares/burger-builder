import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};
const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1.5,
  bacon: 1.8,
  meat: 2.2
};

const addIngredient = (state, action) => {
  const updateIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updateIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};
const removeIngredient = (state, action) => {
  const updateIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updateIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedSt);
};
const setIngredients = (state, action) => {
  const satIngredients = {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  };
  return updateObject(state, satIngredients);
};

const fetchIngredientsFailed = state => {
  return updateObject(state, { error: true });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};
export default reducer;
