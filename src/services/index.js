import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL + "/api/v1";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
