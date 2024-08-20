import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/styles.min.css";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Flash from "./Flash";

const END_POINT = process.env.REACT_APP_END_POINT;

const Login = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  const { login, register, isLoading } = useContext(AuthContext);

  const handleHomeClick = () => {
    window.location.href = "/";
  };

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
        await login({ username });
        navigate("/employeeportal");
      }
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username });
      setEmailSent(true);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <>
      <Navbar loginPage={true} />
      <Flash message={message} setMessage={setMessage} />
      <div className="login-container">
        <div className="login-box">
          {isLoading && <Loader />}
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
              <button onClick={handleHomeClick} className="login-button">
                Go Home
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtp}>
              <div className="input-container">
                <div className="input-group">
                  <label htmlFor="email">OTP sent to your email</label>
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
    </>
  );
};

export default Login;
