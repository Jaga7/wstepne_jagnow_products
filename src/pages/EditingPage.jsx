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
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  const handleEditSubmit = (productInfo) => {
    dispatch(editTheProduct(productInfo));
  };

  return (
    <div>
      EditingPage {productId}
      <ProductForm initialData={product} onSubmit={handleEditSubmit} />
    </div>
  );
};
export default EditingPage;
