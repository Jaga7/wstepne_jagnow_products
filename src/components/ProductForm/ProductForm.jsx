import React, { useState } from "react";
import { Box, TextField, Button, Input } from "@mui/material";

const ProductForm = ({ initialData, onSubmit }) => {
  const [productInfo, setProductInfo] = useState(initialData);

  const handleFieldChange = (fieldName) => (event) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(productInfo);
  };

  return (
    <Box
      component='form'
      sx={{ "& > :not(style)": { m: 1 } }}
      onSubmit={handleSubmit}
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
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
