import React from "react";
import locationIcon from '../assets/images/location-white.png';
import phoneIcon from '../assets/images/telephone-white.png';
import emailIcon from '../assets/images/envelope-white.png';
import { Link } from "react-router-dom";

export default function Banner() {
    return (
        <section className="info_section layout_padding">
            <div className="container">
                <div className="info_contact">
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="https://www.google.com/maps/dir//NYU+Wasserman+Center+for+Career+Development+133+E+13th+St+New+York,+NY+10003/@40.7331888,-73.9885527,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x89c2599ece72534b:0x63f18dce336f2e65">
                                <img src={locationIcon} alt="Location" />
                                <span>133 East 13th Street, 2nd Floor, New York, NY 10003</span>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="tel:+1(212)998-4730">
                                <img src={phoneIcon} alt="Call" />
                                <span>Call : +1 (212) 998-4730</span>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="mailto:career.development@nyu.edu">
                                <img src={emailIcon} alt="Email" />
                                <span>career.development@nyu.edu</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
