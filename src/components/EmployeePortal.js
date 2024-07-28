import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBanner from "./TopBanner";
import Request from "./Request";
import History from "./History";
import "../assets/css/styles.min.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const END_POINT = process.env.REACT_APP_END_POINT;

const EmployeePortal = () => {
  const [mainPage, setMainPage] = useState(null);
  const [subPages, setSubPages] = useState(null);
  const [content, setContent] = useState("request");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const seedData = async () => {
      try {
        const response = await axios.get(`${END_POINT}/seed`, {
          withCredentials: true,
        });
        setMainPage(response.data.mainPage);
        setSubPages(response.data.subPages);
      } catch (error) {
        console.error(error);
      }
    };

    return () => {
      seedData();
    };
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="homepage">
      <Sidebar setContent={setContent} />
      <div className="main-content">
        <TopBanner title="Employee Portal" user={user} />
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
