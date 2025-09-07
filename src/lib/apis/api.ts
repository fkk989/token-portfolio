import axios from "axios";

const cg_api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "x-cg-demo-api-key": import.meta.env.VITE_CG_API_KEY,
  },
});

export default cg_api;
