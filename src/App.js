import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeePortal from "./components/EmployeePortal";
import AdminPortal from "./components/AdminPortal";
import AdminLogin from "./components/AdminLogin";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employeeportal" element={<EmployeePortal />} />
          <Route path="/adminportal" element={<AdminPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
