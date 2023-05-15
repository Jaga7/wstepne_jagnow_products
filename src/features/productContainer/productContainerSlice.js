import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import api from "../../shared/utils/api";

const endpoint = "/products";

const initialState = {
  products: [
    {
      id: 0,
      name: "Default placeholder product",
      description: "This is a default placeholder product",
      price: "10035.35",
    },
  ],
  isLoading: false,
};

export const loadAProductFromApi = createAsyncThunk(
  "productContainer/loadAProduct",
  async (name, thunkAPI) => {
    try {
      const resp = await api.get(
        `${endpoint}?_quantity=1&_taxes=12&_categories_type=uui`
      );
      return resp.data.data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const productContainerSlice = createSlice({
  name: "productContainer",
  initialState,
  reducers: {
    editTheProduct(state, action) {
      const { id, name, description, price } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          name,
          description,
          price,
        };
        toast.info("You edited a product");
      }
    },
    createAProduct(state, action) {
      state.products = [...state.products, { ...action.payload, id: uuidv4() }];
      toast.info("You created a product");
    },
    deleteTheProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      toast.info("You deleted a product");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAProductFromApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadAProductFromApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [
          ...state.products,
          { ...action.payload, id: uuidv4() },
        ];
        toast.info("You loaded a new product");
      })
      .addCase(loadAProductFromApi.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { editTheProduct, createAProduct, deleteTheProduct } =
  productContainerSlice.actions;

export default productContainerSlice.reducer;
