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
    <div>
      <h1>Creating Page</h1>
      <ProductForm
        initialData={{ name: "", description: "", price: "" }}
        onSubmit={handleCreateSubmit}
      />
    </div>
  );
};

export default CreatingPage;
