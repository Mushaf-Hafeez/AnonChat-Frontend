import React, { useEffect, useRef } from "react";

// importing custom components
import Message from "./Message";

const ChatMessages = ({ messages, setMessages }) => {
  const chatContainer = useRef();

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo({
        top: chatContainer.current.scrollHeight + 100,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={chatContainer}
      className="h-full w-full overflow-y-auto scrollbar-none"
    >
      {messages && messages.length > 0 ? (
        <div className="flex flex-col gap-2">
          {messages.map((message, index) => (
            <Message key={index} message={message} setMessages={setMessages} />
          ))}
        </div>
      ) : (
        <h2>No message yet</h2>
      )}
    </div>
  );
};

export default ChatMessages;
