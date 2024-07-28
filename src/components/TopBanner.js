import React from "react";
import "../assets/css/styles.min.css";

const TopBanner = ({ title, user }) => {
  // Function to format the date as "Day, DD Month"
  const formatDate = (date) => {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("en-GB", options); // Adjust locale if needed
  };

  // Get the current date
  const currentDate = new Date();

  if (!user) return null;

  return (
    <div className="top-banner">
      <div className="top-banner-left">
        <h1>{title}</h1>
        <img src="calendar_icon.png" alt="calendar" />
        <h2>{formatDate(currentDate)}</h2>
      </div>
      <div className="top-banner-right">
        <div className="user-info">
          <img src="bellicon.png" alt="Bell Icon" className="bell-icon" />
          <h1>{user.username}</h1>
          <img
            src="dropdown_arrow.png"
            alt="Dropdown Arrow"
            className="dropdown-arrow-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
