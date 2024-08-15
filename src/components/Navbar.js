import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/images/logo1.png";

export default function Navbar({ loginPage }) {
    const [tabName, setTabName] = useState("home");

    // Handle scroll and update active tab
    const handleScroll = () => {
        const sections = ["home", "about", "service", "contact"];
        const scrollPosition = window.pageYOffset + 100; // Adjust to trigger activation a bit early

        let activeTab = "home"; // Default tab if no other tab is active

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const { offsetTop, offsetHeight } = element;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    activeTab = section;
                }
            }
        });

        setTabName(activeTab);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initialize the active tab on page load
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Handle link click and scroll to section
    const scrollToSection = (section) => {
        const element = document.getElementById(section);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Adjust for fixed header height
                behavior: "smooth"
            });
            setTabName(section);
        }
    };

    return (
        <>
            <header className="header_section">
                <div className="container">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <Link className="navbar-brand" to="/">
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
                        {
                            !loginPage ?
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                                        <ul className="navbar-nav">
                                            <li className={`nav-item ${tabName === "home" ? "active" : ""}`}>
                                                <button className="nav-link btn-link" onClick={() => scrollToSection("home")}>
                                                    Home
                                                </button>
                                            </li>
                                            <li className={`nav-item ${tabName === "about" ? "active" : ""}`}>
                                                <button className="nav-link btn-link" onClick={() => scrollToSection("about")}>
                                                    About
                                                </button>
                                            </li>
                                            <li className={`nav-item ${tabName === "service" ? "active" : ""}`}>
                                                <button className="nav-link btn-link" onClick={() => scrollToSection("service")}>
                                                    Service
                                                </button>
                                            </li>
                                            <li className={`nav-item ${tabName === "contact" ? "active" : ""}`}>
                                                <button className="nav-link btn-link" onClick={() => scrollToSection("contact")}>
                                                    Contact
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div> : null
                        }
                    </nav>
                </div>
            </header>
        </>
    );
}
