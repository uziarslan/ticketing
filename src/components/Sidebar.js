import React, { useState, useContext } from "react";
import logo from "../assets/images/logo.png";
import "../assets/css/styles.min.css";
import { AuthContext } from "../Context/AuthContext";

const Sidebar = ({ setContent, title, burgerOpen }) => {
  const [activeTab, setActiveTab] = useState("request");
  const { logout } = useContext(AuthContext);

  const handleTabClick = (tab) => {
    setContent(tab);
    setActiveTab(tab);
  };

  return (
    <>
      <div className="sidebar">
        <div className={`sidebar-links-container ${burgerOpen ? "open" : ""}`}>
          <div className="imageAndTextHolder">
            <img className="dashboardLogo" src={logo} alt="Logo" />
            <h1 className="portalTitle">{title}</h1>
          </div>
          <div className="sidebar-links">
            <div className="redirectButtons">
              <div
                className={`sidebar-link ${
                  activeTab === "request" ? "active" : ""
                }`}
                onClick={() => handleTabClick("request")}
              >
                <div className="sidebar-item">
                  <img
                    src="request_icon.png"
                    alt="Request Icon"
                    className="sidebar-icon"
                  />
                  <h1 className="sidebar-text">Request</h1>
                </div>
              </div>
              <div
                className={`sidebar-link ${
                  activeTab === "history" ? "active" : ""
                }`}
                onClick={() => handleTabClick("history")}
              >
                <div className="sidebar-item">
                  <img
                    src="history_icon.png"
                    alt="History Icon"
                    className="sidebar-icon"
                  />
                  <h1 className="sidebar-text">History</h1>
                </div>
              </div>
            </div>
            <div className="logoutButtonContainer">
              <button onClick={logout} className="logoutButton">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
