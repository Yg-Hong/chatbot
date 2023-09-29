import React from "react";

const Message = ({
  text,
  isUser,
  isTyping,
  id,
  onEndTyping,
  currentTypingId,
}) => {
  return (
    <div className={isUser ? "user-message" : "ai-message"}>
      {isTyping && currentTypingId === id ? (
        // <Typing speed={50} onFinishedTyping={() => onEndTyping(id)}>
        <p>
          <b>AI</b>: {text}
        </p>
      ) : (
        // </Typing>
        <p>
          <b>{isUser ? "User" : "AI"}</b> : {text}
        </p>
      )}
    </div>
  );
};

export default Message;
