import { useAppSelector } from "../../shared/utils/hooks";
import ProductCard from "../ProductCard/ProductCard";
import { Grid} from "@mui/material";

const ProductContainer = () => {
    const { products, isLoading } = useAppSelector((state) => state.productContainer);
  return (
    <Grid container spacing={2} >
      {!isLoading && products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </Grid>
  )
}
export default ProductContainer