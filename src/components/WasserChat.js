import React, { useEffect, useState, useRef } from "react";
import bgChat from "../assets/images/bgchat1.jpeg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Banner from "./Banner";
import axiosInstance from "../services/axiosInstance";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

const WasserChat = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [userInput, setUserInput] = useState("");
  const chatboxRef = useRef(null);

  useEffect(() => {
    const displayWelcomeMessage = () => {
      const chatbox = chatboxRef.current;
      const welcomeMessageDiv = document.createElement("div");
      welcomeMessageDiv.classList.add("chat-message", "chatbot-message");
      welcomeMessageDiv.textContent =
        "Welcome! I'm Wasserchat, here to respond to your student employment-related queries.";
      if (isDisplayed) {
        chatbox.appendChild(welcomeMessageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    };
    displayWelcomeMessage();
    setIsDisplayed(true);
  }, [isDisplayed]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    const chatbox = chatboxRef.current;
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("chat-message", "user-message");
    userMessageDiv.textContent = userInput;
    chatbox.appendChild(userMessageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;

    setUserInput("");
    const formData = {
      question: `${encodeURIComponent(userInput)}`,
    };

    try {
      const { status, data } = await axiosInstance.post(
        "/submit-question",
        formData
      );

      if (status === 200) {
        const chatbox = document.getElementById("chatbox");
        const welcomeMessageDiv = document.createElement("div");
        welcomeMessageDiv.classList.add("chat-message", "chatbot-message");
        welcomeMessageDiv.textContent = data;
        chatbox.appendChild(welcomeMessageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${bgChat})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <form onSubmit={handleChatSubmit} id="chatbot-container">
          <div id="chatbot-header">WasserChat</div>
          <div id="chatbox" ref={chatboxRef}></div>
          <div id="input-area">
            <input
              type="text"
              id="userInput"
              placeholder="Ask me something..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" id="sendbutton">
              Send
            </button>
          </div>
        </form>
      </div>
      <Banner />
      <Footer />
    </>
  );
};

export default WasserChat;
