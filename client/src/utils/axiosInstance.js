import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://lms-ak.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Store reference for Redux store (set from main.jsx)
let storeRef = null;

export const setupAxiosInterceptors = (store) => {
  storeRef = store;

  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      const status = error.response?.status;

      if (status === 401 && storeRef) {
        // Dynamically import to avoid circular dependency
        const authModule = await import("../redux/authSlice");
        storeRef.dispatch(authModule.userLoggedOut());
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
