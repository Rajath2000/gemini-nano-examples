import React from 'react';
import  { useState, useEffect } from "react";
import "./Chat.css";
import ai from '../utils/gemini-nano-wrapper/ai';
import TypingDots from '../components/Typing';
import ChatSuggestions from '../components/suggestion/suggestion';

function debounce(func, wait, immediate) {
  let timeout;

  return function (...args) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}


const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);
    const [input, setInput] = useState("");
    const [value,setValue] = useState("");
    const [typing,setTyping] = useState(false);

    const [suggestions,setSuggestions] = useState(["What is GDP?", "Who is Virat?", "Show examples"]);


    const getSuggestion = async(value) =>{
        let result = await ai.userMessageAutoComplete(value);
        console.log(result?.response?.split(","))
        setSuggestions(result?.response?.split(","))
        console.log("output" , result)
    }


    const handleSuggestionClick = async(text) => {
        setInput(input + "" + text);
    }
    
    const handleSendMessage = async(text) => {
        let inputMessge = text || input.trim() === ""
        if (inputMessge === "") return;

        inputMessge = input;
        const userMessage = { sender: "user", text: inputMessge };
        setMessages([...messages, userMessage]);
    
        setValue("")
        setTyping(true);
        let botReplay = await ai.answerUserQuery(inputMessge);
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
                { message.sender == "user" ? message.text :  <div dangerouslySetInnerHTML={{ __html:  message.text }} />}
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
          <ChatSuggestions
            suggestions={suggestions}
            onSelect={(text) => handleSuggestionClick(text)}
          />
          <div className="input-container">
            <input
              type="text"
              value={value}
              onChange={(e) =>  { setInput(e.target.value);  getSuggestion(e.target.value);} }
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      );
};

export default Chat;
