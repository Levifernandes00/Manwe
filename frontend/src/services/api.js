import axios from "axios";

const BASE_URL = "http:/192.168.0.22:3333";

const api = axios.create({
  baseURL: BASE_URL
});

export default api;
