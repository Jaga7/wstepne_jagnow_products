import React from "react";
import ProductForm from "../components/ProductForm/ProductForm";
import { useAppDispatch } from "../shared/utils/hooks";
import { createAProduct } from "../features/productContainer/productContainerSlice";

const CreatingPage = () => {
  const dispatch = useAppDispatch();
  const handleCreateSubmit = (productData) => {
    dispatch(createAProduct(productData));
  };

  return (
    <>
      <h1>Create A New Product</h1>
      <ProductForm
        initialData={{ name: "", description: "", price: "" }}
        onSubmit={handleCreateSubmit}
      />
    </>
  );
};

export default CreatingPage;
