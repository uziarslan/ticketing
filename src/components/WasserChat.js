import React, { useEffect, useState } from 'react';
import bgChat from '../assets/images/bgchat1.jpeg';
import Navbar from './Navbar';
import Footer from './Footer';
import Banner from './Banner';

const WasserChat = () => {
    const [isDisplayed, setIsDisplayed] = useState(false)
    useEffect(() => {
        const displayWelcomeMessage = () => {
            const chatbox = document.getElementById("chatbox");
            const welcomeMessageDiv = document.createElement("div");
            welcomeMessageDiv.classList.add("chat-message", "chatbot-message");
            welcomeMessageDiv.textContent = "Welcome! I'm Wasserchat, here to respond to your student employment-related queries.";
            if (isDisplayed) {
                chatbox.appendChild(welcomeMessageDiv);
            }
        };
        displayWelcomeMessage();
        setIsDisplayed(true)
    }, [isDisplayed]);

    const askQuestion = () => {
        const userInput = document.getElementById("userInput").value;
        const chatbox = document.getElementById("chatbox");

        const userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("chat-message", "user-message");
        userMessageDiv.textContent = userInput;
        chatbox.appendChild(userMessageDiv);

        fetch('https://www.nikhilpujari.in/Xspace/wassermanphp//chatbot-api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'question=' + encodeURIComponent(userInput)
        })
            .then(response => response.text())
            .then(text => {
                const chatbotResponseDiv = document.createElement("div");
                chatbotResponseDiv.classList.add("chat-message", "chatbot-message");
                chatbotResponseDiv.textContent = text;
                chatbox.appendChild(chatbotResponseDiv);

                chatbox.scrollTop = chatbox.scrollHeight;
                document.getElementById("userInput").value = "";
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <Navbar />
            <div style={{ backgroundImage: `url(${bgChat})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
                <div id="chatbot-container">
                    <div id="chatbot-header">WasserChat</div>
                    <div id="chatbox"></div>
                    <div id="input-area">
                        <input type="text" id="userInput" placeholder="Ask me something..." />
                        <button onClick={askQuestion} id="sendbutton">Send</button>
                    </div>
                </div>
            </div>
            <Banner />
            <Footer />
        </>
    );
};

export default WasserChat;