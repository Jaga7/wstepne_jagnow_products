import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const createAProduct = createAsyncThunk(
  "productContainer/createAProduct",
  async (newProductTitleAndBody, thunkAPI) => {
    const newProduct = { ...newProductTitleAndBody };

    try {
      const resp = await api.post(endpoint, newProduct);
      // tu nie robić post tylko zmieniać state (...state.products, newProduct)
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteTheProduct = createAsyncThunk(
  "productContainer/deleteTheProduct",
  async (idOfProductBeingDeleted, thunkAPI) => {
    try {
      const resp = await api.delete(`${endpoint}/${idOfProductBeingDeleted}`);
      return resp.data;
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
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAProductFromApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadAProductFromApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(loadAProductFromApi.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(createAProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTheProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const idOfProductBeingDeleted = action.meta.arg;
        state.products = state.products.filter(
          // filtering out the deleted product from the local state.products array
          (product) => product.id !== idOfProductBeingDeleted
        );
      })
      .addCase(deleteTheProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { editTheProduct } = productContainerSlice.actions;

export default productContainerSlice.reducer;
