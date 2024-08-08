import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="container-fluid footer_section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-9 mx-auto">
                        <p>
                            &copy; 2019 All Rights Reserved By
                            <Link to="https://www.wassermancenter.com"> Wasserman NYUs</Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
