import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/styles.min.css";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

const END_POINT = process.env.REACT_APP_END_POINT;

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(username);
      navigate("/adminportal");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-group">
              <label htmlFor="email">Enter email</label>
              <input
                type="email"
                id="email"
                placeholder="abc@nyu.edu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
