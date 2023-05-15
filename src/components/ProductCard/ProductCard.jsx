import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../shared/utils/hooks";
import { deleteTheProduct } from "../../features/productContainer/productContainerSlice";

const ProductCard = ({ product }) => {
  const { id, name, price, description } = product;
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTheProduct(id));
  };
  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {name}
        </Typography>
        <Typography variant='h5' component='div'>
          {price}$
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/${product.id}/edit`}>
          <Button size='small'>Edit</Button>
        </Link>
        <Button
          size='small'
          onClick={handleDelete}
          sx={{
            color: "#fff",
            backgroundColor: "#f44336",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
