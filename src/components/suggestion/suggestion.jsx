import React from "react";
import "./suggestion.css";

const ChatSuggestions = ({ suggestions, onSelect }) => {
  return (
    <div className="chat-suggestions">
      {suggestions?.map((suggestion, index) => (
        <button
          key={index}
          className="suggestion-btn"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default ChatSuggestions;
