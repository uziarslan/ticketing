import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/styles.min.css";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

const END_POINT = process.env.REACT_APP_END_POINT;

const Login = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { userLogin } = useAuth();

  const handleOtp = async (e) => {
    e.preventDefault();

    const formData = {
      otp,
      username,
    };

    try {
      const response = await axios.post(`${END_POINT}/verify-code`, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        userLogin(username);
        navigate(response.data.callBack);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
    };

    try {
      const response = await axios.post(`${END_POINT}/register`, formData);
      if (response.status === 200) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to your account</h2>
        {!emailSent ? (
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
        ) : (
          <form onSubmit={handleOtp}>
            <div className="input-container">
              <div className="input-group">
                <label htmlFor="email">2FA</label>
                <input
                  type="text"
                  placeholder="0000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="login-button">
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
