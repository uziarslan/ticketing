import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/images/logo2.png";
import nyuImage from "../assets/images/nyu.jpeg";
import plug from "../assets/images/plug.png";
import s1 from "../assets/images/s1.png";
import s2 from "../assets/images/s2.png";
import s3 from "../assets/images/s3.png";
import s4 from "../assets/images/s4.png";
import s5 from "../assets/images/s5.png";
import aboutImage from "../assets/images/about-img1.jpg";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Footer from "./Footer";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

const HomePage = () => {
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleContactForm = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      contactEmail,
      phone,
      message,
    };

    console.log(formData);

    setName("");
    setContactEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <>
      <div className="hero_area">
        <Navbar />
        <section className="slider_section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="detail_box">
                  <h1>
                    NYU <br />
                    Wasserman Center <br />
                    For Career Development
                  </h1>
                  <p>
                    Wasserman meets any individual exactly where they are in
                    their career journey, helps them examine and internalize the
                    things that matter to them most, and provides them with the
                    guidance, exposure, and support to take action and pursue
                    meaningful careers with confidence.
                  </p>
                  <Link to="/contact" className="">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 offset-lg-1">
                <div className="img_content">
                  <div className="img_container">
                    <div
                      id="carouselExampleControls"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <div className="img-box">
                            <img src={logo2} alt="Carousel" />
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="img-box">
                            <img src={nyuImage} alt="Carousel" />
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="img-box">
                            <img src={logo2} alt="Carousel" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="service_section layout_padding" id="service">
        <div className="container">
          <div className="heading_container">
            <h2>Our Services</h2>
            <img src={plug} alt="Plug Icon" />
          </div>
          <div className="service_container">
            <div className="box">
              <div className="img-box">
                <img src={s1} className="img1" alt="Service 1" />
              </div>
              <div className="detail-box">
                <h5>Chatbot of FAQ</h5>
                <div className="btn-box">
                  <Link to="/wasser-chat">Open WasserChat</Link>
                </div>
              </div>
            </div>
            <div className="box active">
              <div className="img-box">
                <img src={s2} className="img1" alt="Service 2" />
              </div>
              <div className="detail-box">
                <h5>Photobooth for Professional Headshot</h5>
                <div className="btn-box">
                  <Link to="/login-coat">Rent a Coat</Link>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src={s3} className="img1" alt="Service 3" />
              </div>
              <div className="detail-box">
                <h5>IT Ticket System</h5>
                <div className="btn-box">
                  <Link to="/login">Raise Ticket</Link>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src={s4} className="img1" alt="Service 4" />
              </div>
              <div className="detail-box">
                <h5>Events</h5>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available,
                </p>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src={s5} className="img1" alt="Service 5" />
              </div>
              <div className="detail-box">
                <h5>Student Center</h5>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available,
                </p>
              </div>
            </div>
          </div>
          <div className="btn-box">
            <Link to="/service">Read More</Link>
          </div>
        </div>
      </section>

      <section className="about_section layout_padding" id="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Us</h2>
                  <img src={plug} alt="Plug Icon" />
                </div>
                <p>
                  The Wasserman Center for Career Development is New York
                  University’s central career development resource, providing
                  services and support to undergraduate students, graduate and
                  graduate certificate students, postdocs, and alumni with a
                  bachelor’s, master’s, graduate certificate, or doctoral degree
                  from nearly every NYU school.
                </p>
                <p>
                  <b>Our Vision</b>
                  <br />
                  NYU students and alumni thrive as they build rewarding careers
                  that help them to realize their ambition.
                </p>
                <p>
                  <b>Our Mission</b>
                  <br />
                  The NYU Wasserman Center for Career Development empowers our
                  students and alumni to succeed at every stage of their career
                  by creating opportunities for them to develop the skills,
                  experiences, and connections they need to thrive in a dynamic
                  global economy.
                </p>
                <Link to="/blog">Read More</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box">
                <img src={aboutImage} alt="About" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact_section layout_padding" id="contact">
        <div className="container">
          <div className="heading_container">
            <h2>Contact Us</h2>
            <img src={plug} alt="Plug" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleContactForm}>
                <div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    className="message-box"
                    placeholder="Message"
                  />
                </div>
                <div className="d-flex">
                  <button type="submit">SEND</button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="map_container">
                <div className="map-responsive">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.310496978041!2d-73.99112762392943!3d40.733192836317805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599ece72534b%3A0x63f18dce336f2e65!2sNYU%20Wasserman%20Center%20for%20Career%20Development!5e0!3m2!1sen!2sus!4v1706893162396!5m2!1sen!2sus"
                    width="600"
                    height="300"
                    frameBorder="0"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen
                    title="NYU Wasserman Center Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Banner />
      <Footer />
    </>
  );
};

export default HomePage;
