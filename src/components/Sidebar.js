import React, { useState, useEffect } from "react";
import "../assets/css/styles.min.css";

const Sidebar = ({ setContent, title }) => {
  const [activeTab, setActiveTab] = useState("request");

  useEffect(() => {
    // Set the active tab based on the title
    if (title === "Admin Portal") {
      setActiveTab("history");
    } else {
      setActiveTab("request");
    }
  }, [title]);

  const handleTabClick = (tab) => {
    setContent(tab);
    setActiveTab(tab);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-links-container">
        <div className="sidebar-links">
          <div
            className={`sidebar-link ${activeTab === "request" ? "active" : ""}`}
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
            className={`sidebar-link ${activeTab === "history" ? "active" : ""}`}
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
      </div>
    </div>
  );
};

export default Sidebar;
