import axios from "axios";

const URL = "https://fakerapi.it/api/v1/products?_quantity=1&_taxes=12&_categories_type=uui"
// const PORT = 3000;
// const baseURL = `${URL}:${PORT}`;

export default axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
