import { useParams } from "react-router-dom";

import EditForm from "../components/EditForm/EditForm";
import { useAppSelector } from "../shared/utils/hooks";

const EditingPage = () => {
  const { productId } = useParams();
  const { products, isLoading } = useAppSelector(
    (state) => state.productContainer
  );
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  return (
    <div>
      EditingPage {productId}
      <EditForm product={product} />
    </div>
  );
};
export default EditingPage;
