import React, { useState, useEffect } from "react";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! I am your healthcare assistant. Please describe your symptoms, and I'll try to help. Remember, this is for informational purposes only - always consult a healthcare professional for medical advice.",
      isUser: false,
    },
  ]);

  const toggleChatWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (userMessage.trim()) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: userMessage, isUser: true },
          ]);
          setUserMessage("");
    
          try {
            const response = await fetch("http://10.12.215.118:4500/chat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message: userMessage }),
            });
            const data = await response.json();
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: data.response, isUser: false },
            ]);
          } catch (error) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: "Sorry, I encountered an error. Please try again.",
                isUser: false,
              },
            ]);
            console.error("Error:", error);
          }
        }
      };
    
      const closeChat = () => {
        setIsOpen(false);
      };
    

  return (
    <>
      <button id="chat-toggle" onClick={toggleChatWidget}>
        💬
      </button>
      <div
        id="help-text"
        style={{
          display: isOpen ? "block" : "none",
          opacity: isOpen ? 1 : 0,
          bottom: isOpen ? "80px" : "90px",
        }}
      >
        AI Help!! Assistant
      </div>

      <div
        className="chat-widget"
        style={{
          display: isOpen ? "flex" : "none",
        }}
      >
        <div className="chat-header">
          AI Doctor Assistant
          <button
            className="close-button"
            onClick={closeChat}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              color: "var(--chat-text-light)",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.isUser ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Describe your symptoms..."
            value={userMessage}
            onChange={handleMessageChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button className="chat-button" onClick={sendMessage}>
            →
          </button>
        </div>
      </div>

      <style>
        {`
          :root {
            --chat-bg-light: #ffffff;
            --chat-bg-dark: #2d2d2d;
            --chat-header-light: #5f73d5;
            --chat-header-dark: #1e3a8a;
            --chat-text-light: #000000;
            --chat-text-dark: #ffffff;
            --user-message-light: #d1e7ff;
            --user-message-dark: #3b82f6;
            --bot-message-light: #e5e5e5;
            --bot-message-dark: #4b5563;
          }

          body.dark-theme {
            --chat-bg-light: var(--chat-bg-dark);
            --chat-header-light: var(--chat-header-dark);
            --chat-text-light: var(--chat-text-dark);
            --user-message-light: var(--user-message-dark);
            --bot-message-light: var(--bot-message-dark);
          }

          .chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 360px;
            height: 520px;
            background: var(--chat-bg-light);
            color: var(--chat-text-light);
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            display: none;
            flex-direction: column;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .chat-header {
            background: var(--chat-header-light);
            color: var(--chat-text-light);
            padding: 16px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            position: relative;
          }

          .chat-messages {
            flex-grow: 1;
            padding: 16px;
            overflow-y: auto;
            background: var(--chat-bg-light);
          }

          .message {
            margin-bottom: 12px;
            padding: 12px;
            border-radius: 10px;
            max-width: 85%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.4;
            color: var(--chat-text-light);
          }

          .user-message {
            background: var(--user-message-light);
            align-self: flex-end;
            border-radius: 10px 10px 0 10px;
          }

          .bot-message {
            background: var(--bot-message-light);
            align-self: flex-start;
            border-radius: 10px 10px 10px 0;
          }

          .chat-input {
            padding: 14px;
            background: var(--chat-bg-light);
            border-top: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
          }

          .chat-input input {
            width: 75%;
            padding: 10px;
            border: 1px solid var(--chat-text-light);
            border-radius: 20px;
            font-size: 14px;
            background: var(--chat-bg-light);
            color: var(--chat-text-light);
            outline: none;
          }

          .chat-button {
            padding: 10px 16px;
            background: var(--chat-header-light);
            color: var(--chat-text-light);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s ease;
          }

          .chat-button:hover {
            background: var(--chat-header-dark);
          }

          #chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: var(--chat-header-light);
            color: var(--chat-text-light);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 28px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease;
          }

          #chat-toggle:hover {
            transform: scale(1.1);
          }

          #help-text {
            position: fixed;
            bottom: 90px;
            right: 90px;
            background: #ff9800;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease, bottom 0.3s ease;
          }

          #chat-toggle:hover + #help-text {
            display: block;
            opacity: 1;
            bottom: 80px;
          }
        `}
      </style>
    </>
  );
};

export default Chatbox;
