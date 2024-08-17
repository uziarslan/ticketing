import React, { useState } from "react";
import "../assets/css/styles.min.css";
import axiosInstance from "../services/axiosInstance";

const Request = ({ mainPage, subPages, setMessage }) => {
  const [step, setStep] = useState(1);
  const [shortForm, setShortForm] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState(false);
  const [formData, setFormData] = useState({
    requesterName: "",
    telephone: "",
    location: "Union Square", // default value
    subject: "",
    description: "",
  });
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

  const handleNextClick = () => {
    setMessage("")
    if (!formData.requesterName || !formData.telephone) {
      setMessage({ error: "'Name' and 'Telephone' field is required" });
      return;
    }

    if (!formData.requestType) {
      setMessage({ error: "Please select any option" })
      return;
    }

    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!phoneRegex.test(formData.telephone)) {
      setMessage({ error: "Invalid phone number format" });
      return;
    }
    setStep(2);
  };

  const toggleSummary = () => {
    setShowAdditionalOptions(false);
    setShortForm(!shortForm)
  }

  const handleBackClick = () => {
    setSelectedRequestType(null);
    setFormData({});
    setStep(1);
  };

  const handleRadioChange = (e) => {
    setSelectedRequestType(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      requestType: e.target.value,
    }));
  };

  const handleInputChange = (e, content) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleAdditionalOptions = () => {
    setShortForm(false)
    setShowAdditionalOptions((prevState) => !prevState);
  };

  const resetmainPage = () => {
    setFormData({});
    setFormData({
      requesterName: "",
      telephone: "",
      location: "Union Square", // reset to default value
      subject: "",
      description: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")
    if (!formData.requesterName || !formData.telephone) {
      setMessage({ error: "'Name' and 'Telephone' field is required" })
      return;
    }

    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!phoneRegex.test(formData.telephone)) {
      setMessage({ error: "Invalid phone number format" });
      return;
    }

    if (shortForm) {
      if (!formData.subject || !formData.description) {
        setMessage({ error: "Please enter 'Subject' and 'Description'" });
        return;
      }
    }

    if (shortForm || showAdditionalOptions) {
      try {
        const response = await axiosInstance.post("/create-ticket", formData);
        if (response.status === 200) {
          setMessage({ success: "Ticket raised successfully" })
          setStep(1);
          resetmainPage();
          setSelectedRequestType(false);
          setShowAdditionalOptions(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setMessage({ error: "Please describe your issue." });
      return;
    }
  };

  if (!mainPage || !subPages) return null;

  return (
    <form onSubmit={handleSubmit} className="request">
      <h2>Create your ticket</h2>
      {step === 1 && (
        <>
          <div className="form-group">
            <label>
              Please indicate your name (or the requester’s name, if different
              than your name)<span className="mandatory">*</span>
            </label>
            <input
              type="text"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleInputChange}
            />
          </div>

          <div className="first_row">
            <div className="form-group">
              <label>Telephone<span className="mandatory">*</span></label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Location<span className="mandatory">*</span></label>
              <select
                name="location"
                value={formData.location}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="Union Square">Union Square</option>
                <option value="Brooklyn">Brooklyn</option>
              </select>
            </div>
          </div>

          <div className="first_row">
            <button onClick={toggleSummary} className="exploreMoreBtn">Summarize your issue</button>
            <p className="or-text">OR</p>
            <button className="exploreMoreBtn" type="button" onClick={toggleAdditionalOptions}>
              Fill a form
            </button>
          </div>

          {shortForm && (
            <>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="auto-resize-textarea font-family"
                  required
                />
              </div>
            </>
          )}

          {showAdditionalOptions && (
            <div className="form-group">
              <label>
                Please indicate the type of request/support you require, from
                the options below. Don’t see an option that suits best your
                need? Please select other and provide as much detail as
                possible.
              </label>
              {mainPage[1].options.map((option, idx) => (
                <div key={idx}>
                  <input
                    type="radio"
                    id={option}
                    name="requestType"
                    value={option}
                    onChange={handleRadioChange}
                    required
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          )}

          <div className="button-group">
            {!showAdditionalOptions ? (
              <button type="submit">
                Submit
              </button>
            ) : (
              <button type="button" onClick={handleNextClick}>
                Next
              </button>
            )}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          {selectedRequestType &&
            subPages[selectedRequestType].map((content, index) => (
              <div className="form-group" key={index}>
                <label>{content.heading}</label>
                {content.subHeading && (
                  <label style={{ fontSize: "12px" }}>
                    {content.subHeading}
                  </label>
                )}
                {content.type === "text" && (
                  <input
                    type="text"
                    name={content.heading}
                    onChange={(e) => handleInputChange(e, content)}
                    required
                  />
                )}
                {content.type === "date" && (
                  <input
                    type="date"
                    name={content.heading}
                    onChange={(e) => handleInputChange(e, content)}
                    required
                  />
                )}
                {content.type === "time" && (
                  <input
                    type="time"
                    name={content.heading}
                    onChange={(e) => handleInputChange(e, content)}
                    required
                  />
                )}
                {content.type === "radio" && (
                  <div className="radio-option-group">
                    {content.options.map((option, idx) => (
                      <div key={idx}>
                        <input
                          type="radio"
                          id={option}
                          name={content.heading}
                          value={option}
                          required
                          onChange={(e) => handleInputChange(e, content)}
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
                {content.type === "select" && (
                  <select
                    name={content.heading}
                    onChange={(e) => handleInputChange(e, content)}
                  >
                    {content.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {content.type === "checkbox" && (
                  <div className="checkbox-option-group">
                    {content.options.map((option, idx) => (
                      <div key={idx}>
                        <input
                          type="checkbox"
                          id={option}
                          name={option}
                          onChange={(e) => handleInputChange(e, content)}
                          required
                        />
                        <label style={{ margin: "0px", marginLeft: "10px" }} htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          <div className="button-group">
            <button type="button" onClick={handleBackClick}>
              Back
            </button>
            <button type="submit">
              Submit
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Request;
