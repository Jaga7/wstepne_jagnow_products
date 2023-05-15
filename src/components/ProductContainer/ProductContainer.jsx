import { useAppSelector } from "../../shared/utils/hooks";
import ProductCard from "../ProductCard/ProductCard";
import { Grid, CircularProgress } from "@mui/material";

const ProductContainer = () => {
  const { products, isLoading } = useAppSelector(
    (state) => state.productContainer
  );

  if (isLoading) {
    // Render a spinner while loading
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2} justifyContent='center'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};
export default ProductContainer;
