import React, { useState } from 'react';
import plug from '../assets/images/plug.png';
import photo from '../assets/images/photo.jpg';
import Footer from './Footer';
import Navbar from './Navbar';
import Banner from './Banner';

const Contact = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [name, setName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            password
        }

        console.log(formData);

        setEmail("")
        setPassword("")
    }

    const handleContactForm = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            contactEmail,
            phone,
            message
        }

        console.log(formData);

        setName("")
        setContactEmail("")
        setPhone("")
        setMessage("")
    }

    return (
        <>
            <Navbar />
            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2>Rent a coat</h2>
                        <img src={plug} alt="Plug" />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleForm}>
                                <div>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Username" />
                                </div>
                                <div>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </div>
                                <div className="d-flex">
                                    <button type='submit'>
                                        LOGIN
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="map_container">
                                <div><img src={photo} alt="Coat" width="70%" /></div>
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
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                                </div>
                                <div>
                                    <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" placeholder="Email" />
                                </div>
                                <div>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone Number" />
                                </div>
                                <div>
                                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className="message-box" placeholder="Message" />
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
                                        style={{ border: 0, width: '100%', height: '100%' }}
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

export default Contact;
