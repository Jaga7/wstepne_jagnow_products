import { useParams } from "react-router-dom";

import ProductForm from "../components/ProductForm/ProductForm";
import { useAppSelector, useAppDispatch } from "../shared/utils/hooks";
import { editTheProduct } from "../features/productContainer/productContainerSlice";

const EditingPage = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { products, isLoading } = useAppSelector(
    (state) => state.productContainer
  );
  const product = products.find((product) => product.id == productId);

  const handleEditSubmit = (productInfo) => {
    dispatch(editTheProduct(productInfo));
  };

  return (
    <>
      <h1>Edit Page</h1>
      <ProductForm initialData={product} onSubmit={handleEditSubmit} />
    </>
  );
};
export default EditingPage;
