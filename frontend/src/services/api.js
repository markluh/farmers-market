import axios from "axios";

const api = axios.create({
  baseURL: "https://yzcfyk-5000.csb.app/" || "http://localhost:5000/api",
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
