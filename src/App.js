import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeePortal from "./components/EmployeePortal";
import AdminPortal from "./components/AdminPortal";
import AdminLogin from "./components/AdminLogin";
import "./App.css";
import HomePage from "./components/Homepage";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import Service from "./components/Service";
import WasserChat from "./components/WasserChat";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employeeportal" element={<EmployeePortal />} />
          <Route path="/adminportal" element={<AdminPortal />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/service" element={<Service />} />
          <Route path="/wasser-chat" element={<WasserChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
