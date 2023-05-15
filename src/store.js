import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import productContainerReducer from "./features/productContainer/productContainerSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  productContainer: productContainerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: [thunk],
  });

  const persistor = persistStore(store);
  return { store, persistor };
};
