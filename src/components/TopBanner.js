import React, { useState } from "react";
import "../assets/css/styles.min.css";

const TopBanner = ({ title, user, logout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to format the date as "Day, DD Month"
  const formatDate = (date) => {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("en-GB", options); // Adjust locale if needed
  };

  // Get the current date
  const currentDate = new Date();

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  if (!user) return null;

  return (
    <div className="top-banner">
      <div className="top-banner-left">
        <h1>{title}</h1>
        <img src="calendar_icon.png" alt="calendar" />
        <h2>{formatDate(currentDate)}</h2>
      </div>
      <div className="top-banner-right">
        <div onClick={toggleDropdown} className="user-info">
          <img src="bellicon.png" alt="Bell Icon" className="bell-icon" />
          <h1>{user.username}</h1>
          <img
            src="dropdown_arrow.png"
            alt="Dropdown Arrow"
            className="dropdown-arrow-icon"
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
