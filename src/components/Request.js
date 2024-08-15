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
    location: "Brooklyn", // default value
    subject: "",
    description: "",
  });
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

  const handleNextClick = () => {
    if (!formData.requesterName) {
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
      location: "Brooklyn", // reset to default value
      subject: "",
      description: "",
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setMessage("")
    if (!formData.requesterName || !formData.telephone) {
      setMessage({ error: "'Name' and 'Telephone' field is required" })
      return;
    }
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
  };

  if (!mainPage || !subPages) return null;

  return (
    <div className="request">
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
                <option value="Brooklyn">Brooklyn</option>
                <option value="Union Square">Union Square</option>
              </select>
            </div>
          </div>

          <div className="first_row">
            <button onClick={toggleSummary} className="exploreMoreBtn">Summarize your issue</button>
            <p style={{ margin: 0 }}>OR</p>
            <button className="exploreMoreBtn" type="button" onClick={toggleAdditionalOptions}>
              Describe your issue
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
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="auto-resize-textarea font-family"
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
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          )}

          <div className="button-group">
            {!showAdditionalOptions ? (
              <button type="button" onClick={handleSubmit}>
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
                  />
                )}
                {content.type === "date" && (
                  <input
                    type="date"
                    name={content.heading}
                    onChange={(e) => handleInputChange(e, content)}
                  />
                )}
                {content.type === "time" && (
                  <input
                    type="time"
                    name={content.heading}
                    onChange={(e) => handleInputChange(e, content)}
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
                        />
                        <label htmlFor={option}>{option}</label>
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
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Request;
