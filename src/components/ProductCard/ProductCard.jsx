import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, price, description, image } = product;
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
      </CardActions>
    </Card>
  );
};
export default ProductCard;
