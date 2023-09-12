import axios from "axios";
import config from "../utils/config";

const defaultOptions = {
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
let instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";
  return config;
});

export default instance;
