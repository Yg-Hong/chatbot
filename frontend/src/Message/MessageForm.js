import React, { useState } from "react";

const MessageForm = ({ onSendMessage }) => {
  const [message, setMessages] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessages("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessages(event.target.value)}
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

export default MessageForm;
