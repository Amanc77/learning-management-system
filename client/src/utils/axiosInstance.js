import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // MUST be true to send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
