import ProductContainer from "../components/ProductContainer/ProductContainer"
import { useAppDispatch } from "../shared/utils/hooks";
import { Button } from "@mui/material";
import {
  loadAProductFromApi,
} from "../features/productContainer/productContainerSlice";

const Home = () => {
    const dispatch = useAppDispatch();
    const loadANewProduct =()=>{ dispatch(loadAProductFromApi())}
  return (
    <div>
      <h1>Home</h1>
      <ProductContainer/>
      <Button size="large" onClick={()=>loadANewProduct()}>get a new product</Button>
    </div>
  )
}
export default Home