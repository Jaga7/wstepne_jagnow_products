import axios from "axios";

const URL = "https://fakerapi.it/api/v1";

export default axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
