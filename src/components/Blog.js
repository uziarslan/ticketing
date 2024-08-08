import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import plug from '../assets/images/plug.png';
import blog1 from '../assets/images/blog1.jpg';
import blog2 from '../assets/images/blog2.jpg';
import locationIcon from '../assets/images/location-white.png';
import phoneIcon from '../assets/images/telephone-white.png';
import emailIcon from '../assets/images/envelope-white.png';
import fbIcon from '../assets/images/fb.png';
import twitterIcon from '../assets/images/twitter.png';
import linkedinIcon from '../assets/images/linkedin.png';
import instagramIcon from '../assets/images/instagram.png';
import Navbar from './Navbar';
import Footer from './Footer';

const Blog = () => {
    const [email, setEmail] = useState("")

    const handleSubscribe = async (e) => {
        e.preventDefault();

        const formData = {
            email
        }

        console.log(formData);

        setEmail("");
    }
    return (
        <>
            <Navbar />
            <section className="blog_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2>Blog</h2>
                        <img src={plug} alt="Plug" />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="box">
                                <div className="img-box">
                                    <img src={blog1} alt="Blog 1" />
                                </div>
                                <div className="detail-box">
                                    <h5>Blog Title Goes Here</h5>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="box">
                                <div className="img-box">
                                    <img src={blog2} alt="Blog 2" />
                                </div>
                                <div className="detail-box">
                                    <h5>Blog Title Goes Here</h5>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                    <div className="row">
                        <div className="col-md-8 col-lg-9">
                            <div className="info_form">
                                <form onSubmit={handleSubscribe}>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
                                    <button type="submit">Subscribe</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <div className="info_social">
                                <div><Link to=""><img src={fbIcon} alt="Facebook" /></Link></div>
                                <div><Link to=""><img src={twitterIcon} alt="Twitter" /></Link></div>
                                <div><Link to=""><img src={linkedinIcon} alt="LinkedIn" /></Link></div>
                                <div><Link to=""><img src={instagramIcon} alt="Instagram" /></Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Blog;
