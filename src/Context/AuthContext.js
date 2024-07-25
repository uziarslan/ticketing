import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    !!localStorage.getItem("adminToken")
  );

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    !!localStorage.getItem("userToken")
  );

  const adminLogin = async (username) => {
    try {
      const { data } = await axiosInstance.post("/admin/login", {
        username,
      });
      localStorage.setItem("adminToken", data.token);
      setIsAdminAuthenticated(true);
    } catch (error) {
      console.error(
        "Admin login failed",
        error.response?.data?.message || "An error occurred"
      );
      throw error;
    }
  };

  const userLogin = async (username) => {
    try {
      const { data } = await axiosInstance.post("/login", {
        username,
      });
      localStorage.setItem("userToken", data.token);
      setIsUserAuthenticated(true);
    } catch (error) {
      console.error(
        "User login failed",
        error.response?.data?.message || "An error occurred"
      );
      throw error;
    }
  };

  const adminLogout = async () => {
    try {
      await axiosInstance.get("/admin/logout"); // Call backend logout endpoint
      localStorage.removeItem("adminToken");
      setIsAdminAuthenticated(false);
    } catch (error) {
      console.error("Admin logout failed", error);
    }
  };

  const userLogout = async () => {
    try {
      await axiosInstance.get(`${process.env.REACT_APP_END_POINT}/logout`); // Call backend logout endpoint
      localStorage.removeItem("userToken");
      setIsUserAuthenticated(false);
    } catch (error) {
      console.error("User logout failed", error);
    }
  };
  const requestPasswordReset = async (email) => {
    try {
      await axiosInstance.post("/reset-password", { email });
    } catch (error) {
      console.error(
        "Password reset request failed",
        error.response?.data?.message || "An error occurred"
      );
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAdminAuthenticated,
        isUserAuthenticated,
        adminLogin,
        userLogin,
        adminLogout,
        userLogout,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
