import axios from "axios";

const API_URL = `${process.env.REACT_APP_END_POINT}/api/auth`;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const adminLogin = async (adminData) => {
  const response = await axios.post(`${API_URL}/admin/login`, adminData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("adminToken", response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("adminToken");
};

const getUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  return null;
};

const getAdmin = async () => {
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) {
    const response = await axios.get(`${API_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    return response.data;
  }
  return null;
};

const authService = {
  register,
  login,
  adminLogin,
  logout,
  getUser,
  getAdmin,
};

export default authService;
