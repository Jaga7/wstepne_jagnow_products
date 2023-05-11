import { useAppDispatch, useAppSelector } from "../../shared/utils/hooks";
import ProductCard from "../ProductCard/ProductCard";
import { Box } from "@mui/material";

const ProductContainer = () => {
    const { products, isLoading } = useAppSelector((state) => state.productContainer);
  return (
    <Box>
      {!isLoading && products.map((product) => (
        <ProductCard product={product}/>
      ))}
      </Box>
  )
}
export default ProductContainer