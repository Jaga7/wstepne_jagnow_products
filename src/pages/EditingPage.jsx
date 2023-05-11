import { useParams } from "react-router-dom";

const EditingPage = () => {
   const { productId } = useParams();
  return (
    <div>EditingPage {productId}</div>
  )
}
export default EditingPage