import React, { useState } from "react";
import "../assets/css/styles.min.css";
import axiosInstance from "../services/axiosInstance";

const Request = ({ mainPage, subPages }) => {
  const [step, setStep] = useState(1);
  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [formData, setFormData] = useState({});

  const handleNextClick = () => {
    setStep(2);
  };

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

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/create-ticket", formData);
      if (response.status === 200) {
        setStep(1);
        setSelectedRequestType(null);
        setFormData({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  // if (!mainPage || !subPages) return null;

  return (
    <div className="request">
      <h2>Create your ticket</h2>
      {step === 1
        ? mainPage.map((content, index) => (
            <div className="form-group" key={index}>
              <label>{content.heading}</label>
              {content.type === "text" ? (
                <input
                  type="text"
                  name={content.heading}
                  onChange={(e) => handleInputChange(e, content)}
                />
              ) : content.type === "radio" ? (
                <div className="radio-option-group">
                  {content.options.map((option, idx) => (
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
              ) : null}
            </div>
          ))
        : selectedRequestType &&
          subPages[selectedRequestType].map((content, index) => (
            <div className="form-group" key={index}>
              <label>{content.heading}</label>
              {content.subHeading && (
                <label style={{ fontSize: "12px" }}>{content.subHeading}</label>
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
      {step === 1 && (
        <button
          disabled={!selectedRequestType}
          type="button"
          onClick={handleNextClick}
        >
          Next
        </button>
      )}
      {step === 2 && (
        <>
          <button type="button" onClick={handleBackClick}>
            Back
          </button>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default Request;
