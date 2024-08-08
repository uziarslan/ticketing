import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"
import logo1 from "../assets/images/logo1.png"

export default function Navbar() {
    const [tabName, setTabName] = useState("")

    return (
        <>
            <header className="header_section">
                <div className="container">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <Link className="navbar-brand" to="/homepage">
                            <img src={logo1} alt="NYU Wasserman Center" />
                            <span>NYU Wasserman Center</span>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="s-1"></span>
                            <span className="s-2"></span>
                            <span className="s-3"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                                <ul className="navbar-nav">
                                    <li onClick={() => setTabName("home")} className={`nav-item ${tabName === "home" ? "active" : ""}`}>
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li onClick={() => setTabName("about")} className={`nav-item ${tabName === "about" ? "active" : ""}`}>
                                        <ScrollLink className="nav-link" to="about" smooth={true} duration={500}>About</ScrollLink>
                                    </li>
                                    <li onClick={() => setTabName("service")} className={`nav-item ${tabName === "service" ? "active" : ""}`}>
                                        <ScrollLink className="nav-link" to="service" smooth={true} duration={500}>Service</ScrollLink>
                                    </li>
                                    <li onClick={() => setTabName("events")} className={`nav-item ${tabName === "events" ? "active" : ""}`}>
                                        <ScrollLink className="nav-link" to="events" smooth={true} duration={500}>Events</ScrollLink>
                                    </li>
                                    <li onClick={() => setTabName("contact")} className={`nav-item ${tabName === "contact" ? "active" : ""}`}>
                                        <ScrollLink className="nav-link" to="contact" smooth={true} duration={500}>Contact</ScrollLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}
