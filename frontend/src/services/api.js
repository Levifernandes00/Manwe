import axios from 'axios';

const BASE_URL = 'http:/192.168.15.16:3333';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;