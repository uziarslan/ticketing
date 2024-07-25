import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/styles.min.css";

const Signup = () => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State to manage password fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Function to toggle password visibility
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle confirm password visibility
  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      navigate("/employeeportal");
    } else {
      // Set error message if passwords do not match
      setPasswordError("Passwords do not match.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-group">
              <label htmlFor="email">Enter email</label>
              <input
                type="email"
                id="email"
                placeholder="abc@gmail.com"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Enter password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={handlePasswordToggle}
                >
                  <img
                    src="password_toggle.png"
                    alt="Toggle password visibility"
                  />
                </button>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm password</label>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={handleConfirmPasswordToggle}
                >
                  <img
                    src="password_toggle.png"
                    alt="Toggle confirm password visibility"
                  />
                </button>
              </div>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="signup-button">
            Register
          </button>
        </form>
        <div className="login">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
