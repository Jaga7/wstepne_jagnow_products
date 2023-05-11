import { combineReducers, configureStore } from "@reduxjs/toolkit";

import productContainerReducer from "./features/productContainer/productContainerSlice";

const rootReducer = combineReducers({
  productContainer: productContainerReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
