import axios from "axios";
import authService from "./authService";

const axiosInstanceAdmin = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.logout();
      window.location.href = "/admin/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceAdmin;
