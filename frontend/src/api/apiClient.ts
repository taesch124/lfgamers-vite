import axios from "axios";

const appClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// appClient.interceptors.response = {};
export default appClient;