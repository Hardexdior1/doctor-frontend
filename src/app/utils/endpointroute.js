import axios from "axios";

const endpointroute = axios.create({
  baseURL: "https://doctor-backend-x7dv.onrender.com/api",
});

endpointroute.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default endpointroute;
