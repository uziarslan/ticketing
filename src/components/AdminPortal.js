import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import TopBanner from "./TopBanner";
import Solved from "./Solved";
import "../assets/css/styles.min.css";
import Ticket from "./Tickets";
import { AuthContext } from "../Context/AuthContext";
import authService from "../services/authService";

const AdminPortal = () => {
  const [content, setContent] = useState("request");
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { admin } = useContext(AuthContext);

  return (
    <div className="homepage">
      <Sidebar
        title="Admin Portal"
        burgerOpen={burgerOpen}
        setContent={setContent}
        selectedTab={content}
      />
      <div className="main-content">
        <TopBanner
          burgerOpen={burgerOpen}
          setBurgerOpen={setBurgerOpen}
          title="Wasserman Staff Tech Support & Event Setup"
          user={admin}
          logout={authService.logout}
        />
        <div className="content">
          {content === "request" && <Ticket />}
          {content === "history" && <Solved user="user" />}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
