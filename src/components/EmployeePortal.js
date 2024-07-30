import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBanner from "./TopBanner";
import Request from "./Request";
import History from "./History";
import "../assets/css/styles.min.css";
import axiosInstance from "../services/axiosInstance";
import { AuthContext } from "../Context/AuthContext";
import authService from "../services/authService";

const EmployeePortal = () => {
  const [mainPage, setMainPage] = useState(null);
  const [subPages, setSubPages] = useState(null);
  const [content, setContent] = useState("request");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const seedData = async () => {
      try {
        const response = await axiosInstance.get("/seed");
        console.log(response);
        setMainPage(response.data.mainPage);
        setSubPages(response.data.subPages);
      } catch (error) {
        console.error(error);
      }
    };

    seedData();
  }, [mainPage, subPages]);

  if (!user) return null;

  return (
    <div className="homepage">
      <Sidebar title="Employee Portal" setContent={setContent} />
      <div className="main-content">
        <TopBanner
          title="Wasserman Staff Tech Support & Event Setup"
          user={user}
          logout={authService.logout}
        />
        <div className="content">
          {content === "request" && (
            <Request mainPage={mainPage} subPages={subPages} />
          )}
          {content === "history" && <History user={user} />}
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;
