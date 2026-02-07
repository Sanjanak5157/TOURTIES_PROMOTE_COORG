
import React, { useState, useEffect, useRef } from "react";
import { sendChatMessage, getChatbotSuggestions } from "../api";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm your Coorg Tourism Assistant. Ask me about places to visit, travel tips, weather, or anything about Coorg! 😊" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
    
  useEffect(() => {
    // Fetch initial suggestions
    getChatbotSuggestions()
      .then(data => setSuggestions(data.suggestions))
      .catch(() => {
        setSuggestions([
          "Best places in Coorg?",
          "Weather in December?",
          "Hotels in Madikeri?",
          "Local food to try?"
        ]);
      });
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const data = await sendChatMessage(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
      
      // Update suggestions if available
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "I'm having trouble connecting. Here are some Coorg highlights: Visit Abbey Falls, try Pandi Curry, explore coffee plantations, and enjoy the beautiful weather! ☕🌿" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#2c5530",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.backgroundColor = "#1e3a1f";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.backgroundColor = "#2c5530";
        }}
      >
        💬
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "500px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 5px 25px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
            border: "1px solid #e0e0e0",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#2c5530",
              color: "white",
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                Coorg Tourism Assistant
              </h3>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.8 }}>
                Ask me anything about Coorg!
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    backgroundColor: msg.type === "user" ? "#2c5530" : "#e0e0e0",
                    color: msg.type === "user" ? "white" : "black",
                    padding: "10px 15px",
                    borderRadius: "18px",
                    maxWidth: "80%",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  {msg.text}
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#666",
                    marginTop: "4px",
                    marginLeft: msg.type === "user" ? "0" : "10px",
                    marginRight: msg.type === "user" ? "10px" : "0",
                  }}
                >
                  {msg.type === "user" ? "You" : "Coorg Assistant"}
                </span>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: "10px 15px",
                    borderRadius: "18px",
                    fontSize: "14px",
                  }}
                >
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {suggestions.length > 0 && (
            <div
              style={{
                padding: "10px 15px",
                backgroundColor: "#f0f0f0",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
                Quick questions:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(suggestion)}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #2c5530",
                      color: "#2c5530",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2c5530";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "#2c5530";
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div
            style={{
              padding: "15px",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Coorg tourism..."
              style={{
                flex: 1,
                padding: "10px 15px",
                borderRadius: "25px",
                border: "1px solid #e0e0e0",
                fontSize: "14px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2c5530";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              style={{
                backgroundColor: "#2c5530",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                opacity: isLoading || !inputMessage.trim() ? 0.5 : 1,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;