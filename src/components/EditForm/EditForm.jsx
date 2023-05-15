import { Box, TextField, Button, Input } from "@mui/material";
import { useState } from "react";

import { editTheProduct } from "../../features/productContainer/productContainerSlice";
import { useAppDispatch } from "../../shared/utils/hooks";

const EditForm = ({ product }) => {
  const dispatch = useAppDispatch();
  const [productInfo, setProductInfo] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
  });

  const handleFieldChange = (fieldName) => (event) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [fieldName]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(editTheProduct(productInfo));
  };
  return (
    <Box
      component='form'
      sx={{ "& > :not(style)": { m: 1 } }}
      onSubmit={onSubmit}
      noValidate
      autoComplete='off'
    >
      <TextField
        label='name'
        variant='outlined'
        value={productInfo.name}
        onChange={handleFieldChange("name")}
        fullWidth
      />
      <TextField
        label='description'
        variant='outlined'
        value={productInfo.description}
        onChange={handleFieldChange("description")}
        fullWidth
        multiline
        minRows={3}
      />
      <Input
        type='number'
        label='price'
        variant='outlined'
        value={productInfo.price}
        onChange={handleFieldChange("price")}
        inputProps={{ min: 0 }}
      />
      <Box sx={{ mt: 2 }}>
        <Button type='submit' variant='contained'>
          submit
        </Button>
      </Box>
    </Box>
  );
};
export default EditForm;
