import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/utils/api";

const endpoint = "/products";

const initialState = {
  products: [
    {
      id: 1,
      name: "Default placeholder product",
      description: "This is a default placeholder product",
      ean: "2177350729108",
      upc: "963841738841",
      image: "http://placeimg.com/640/480/tech",
      images: [
        {
          title: "Repellat dolores et ut rerum.",
          description:
            "Sunt ut alias iste non facilis dolorum. Quo provident explicabo et est cupiditate explicabo voluptatem. Consectetur atque quod explicabo asperiores rerum aliquam.",
          url: "http://placeimg.com/640/480/any",
        },
        {
          title: "In est aut modi quia enim.",
          description:
            "Ut animi reiciendis maiores. Vitae consectetur rerum et sapiente qui. Deserunt sint quos at temporibus eaque eos.",
          url: "http://placeimg.com/640/480/any",
        },
        {
          title: "Sit vel sed eos saepe sit.",
          description:
            "Porro ut nulla voluptates sit nihil molestiae quas. Vel illo voluptas et omnis deleniti est tempora. Architecto tempora doloribus quidem mollitia qui laborum maiores.",
          url: "http://placeimg.com/640/480/any",
        },
      ],
      net_price: 8960.13,
      taxes: "12",
      price: "10035.35",
      categories: [
        "8b5c09dc-e996-313c-b3ab-f4b65b2ce1ca",
        "1fd4c1aa-bf6d-3607-8356-3ada64317ea2",
        "f4736b7a-dc41-3005-a3c1-1a4da8bdfc2f",
        "66fcd422-08e8-3a40-8716-ab81375af568",
        "713a804d-b313-3ff6-97f5-695042f61e78",
        "5cf131d1-67b0-3d3b-9963-3db4a93d1bbc",
        "26ba15a3-fb98-33ed-b67c-e9a2a402ab01",
      ],
      tags: [
        "distinctio",
        "eligendi",
        "aut",
        "autem",
        "commodi",
        "repellat",
        "nobis",
      ],
    },
  ],
  isLoading: false,
};

export const loadAProductFromApi = createAsyncThunk(
  "productContainer/loadAProduct",
  async (name, thunkAPI) => {
    try {
      const resp = await api.get(`${endpoint}`);
      return resp.data;
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
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const editTheProduct = createAsyncThunk(
  "productContainer/editTheProduct",
  async (
    // editedProductIdAndNewTitleAndBody: {
    //   title: string;
    //   body: string;
    //   idOfProductBeingEdited: number;
    // },
    product,
    thunkAPI
  ) => {
    // const { idOfProductBeingEdited } = editedProductIdAndNewTitleAndBody;
    // const { title, body } = editedProductIdAndNewTitleAndBody;
    const {
      id: idOfProductBeingEdited,
      body: newBody,
      title: newTitle,
    } = product;
    try {
      const resp = await api.put(`${endpoint}/${idOfProductBeingEdited}`, {
        id: idOfProductBeingEdited,
        title: newTitle,
        body: newBody,
      });
      // const resp = await api.patch(`${endpoint}/${idOfProductBeingEdited}`, {
      //   title,
      //   body,
      // });
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
  reducers: {},
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
      .addCase(editTheProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTheProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // the part below is done so that we make the changes on the local state without doing unnecessary additional GET request

        const {
          id: idOfProductBeingEdited,
          title: newTitle,
          body: newBody,
        } = action.meta.arg;
        // const { idOfProductBeingEdited, title, body } = action.meta.arg;
        state.products = [
          // mapping over products in search for the one that is to be edited,
          ...state.products.map(
            (product) =>
              product.id === idOfProductBeingEdited
                ? //setting a new one in place, leaving the "id" and "isComplete" properties as they were
                  {
                    title: newTitle,
                    body: newBody,
                    id: product.id,
                  }
                : product // for the rest of the products we return them back as they were
          ),
        ];
      })
      .addCase(editTheProduct.rejected, (state) => {
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

export default productContainerSlice.reducer;
