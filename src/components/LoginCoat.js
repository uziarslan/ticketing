import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Banner from "./Banner";
import plug from "../assets/images/plug.png";
import photo from "../assets/images/photo.jpg";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import { useNavigate } from "react-router-dom";
import Flash from "./Flash";

export default function LoginCoat() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});
  const rentUser = localStorage.getItem("rentUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (rentUser === "true") {
      navigate("/service");
    }
  }, [rentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    if (username === "frontdesk" && password === "12345678") {
      localStorage.setItem("rentUser", true);
      navigate("/service");
    } else {
      setMessage({ error: "Invalid username or password" });
    }
  };

  return (
    <>
      <Navbar />
      <Flash message={message} setMessage={setMessage} />
      <section className="contact_section layout_padding">
        <div className="container ">
          <div className="heading_container">
            <h2>Login into Coat Rental System</h2>
            <img src={plug} alt="Plug vector" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex ">
                  <input type="submit" value="Login" />
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="map_container">
                <div>
                  <img alt="POD" src={photo} width="70%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Banner />
      <Footer />
    </>
  );
}
