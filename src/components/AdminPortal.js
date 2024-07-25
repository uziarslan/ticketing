import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBanner from "./TopBanner";
import Solved from "./Solved";
import "../assets/css/styles.min.css";
import Ticket from "./Tickets";

const AdminPortal = () => {
  const [content, setContent] = useState("request");

  return (
    <div className="homepage">
      <Sidebar setContent={setContent} selectedTab={content} />
      <div className="main-content">
        <TopBanner title="Admin Portal" user="user" />
        <div className="content">
          {content === "request" && <Ticket />}
          {content === "history" && <Solved user="user" />}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
