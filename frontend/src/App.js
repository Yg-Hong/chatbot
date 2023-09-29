import React, { useState, useEffect } from "react";
import MessageList from "./Message/MessageList";
import MessageForm from "./Message/MessageForm";
import "./App.css";

const App = () => {
  /**
   * Hook을 이용해 두가지 상태를 기억할 것.
   * message : 모든 채팅 메시지를 저장
   * currentTypingId : 현재 AI가 타이핑하는 메시지를 추적한다.
   */
  const [message, setMessages] = useState([]);
  const [currentTypingId, setCurrentTypingId] = useState(null);

  /**
   * 사용자가 메시지를 보낼 때 호출
   * message 상태 업데이트에 사용되어
   * 기존 메시지 목록에 파라미터를 추가한다.
   * @param {사용자의 msg or AI의 응답} message
   */
  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
      {
        text: `Your message is: "${message}`,
        isUser: false,
        isTyping: true,
        id: Date.now(),
      },
    ]);
  };

  /**
   * 메시지 타이핑 애니메이션이 끝나면 호출
   *
   * @param {타이핑 종료된 msg의 ID} id
   */
  const handleEndTyping = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, isTyping: false } : msg
      )
    );
    setCurrentTypingId(null);
  };

  /**
   * 렌더링 후 사이드 이펙트를 실행하는 훅
   * currentTypingId가 null이면
   * isTyping이 true인 다음 메시지를 찾아
   * currentTypingId로 설정한다.
   */
  useEffect(() => {
    if (currentTypingId === null) {
      const nextTypingMessage = message.find(
        (msg) => !msg.isUser && msg.isTyping
      );
      if (nextTypingMessage) {
        setCurrentTypingId(nextTypingMessage.id);
      }
    }
  }, [message, currentTypingId]);

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="chat-box">
        <MessageList
          messages={message}
          currentTypingId={currentTypingId}
          onEndTyping={handleEndTyping}
        />
        <MessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
