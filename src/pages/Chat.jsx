import React from 'react';
import  { useState, useEffect } from "react";
import "./Chat.css";
import ai from '../utils/gemini-nano-wrapper/ai';
import TypingDots from '../components/Typing';
const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you today?" },
      ]);
    const [input, setInput] = useState("");
    const [value,setValue] = useState("");
    const [typing,setTyping] = useState(false);
    
    const handleSendMessage = async() => {
        if (input.trim() === "") return;
        // Add user's message
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);
        // Simulate bot's reply
        setValue("")
        setTyping(true);
        let botReplay = await ai.answerUserQuery(input);
        const message = {
            sender: "bot",
            text: `${botReplay?.response}. How can I assist further?`,
        };
        setMessages((prevMessages) => [...prevMessages, message]);
        setTyping(false);
      };
    
    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSendMessage();
      };


    useEffect(()=>{
     setValue(input);
    },[input]);
    
    useEffect(()=>{
        return () =>{
        ai.closeSession()
        }
    },[])
    
    return (
        <div className="chat-container">
          <div className="chat-box">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "bot" ? "bot" : "user"}`}
              >
                {message.text}
              </div>
            ))}
            {
             typing ?
                <div
                className={`message bot`}
                >
                 <TypingDots />
                </div>
                : null
            }
          </div>
          <div className="input-container">
            <input
              type="text"
              value={value}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      );
};

export default Chat;
