import React, { useEffect, useRef } from "react";

// importing custom components
import Message from "./Message";

const ChatMessages = ({ messages }) => {
  const chatContainer = useRef();

  // Todo: need to fix why the container is not scrolled to the end

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo({
        top: chatContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div ref={chatContainer} className="h-full w-full overflow-y-auto">
      {messages && messages.length > 0 ? (
        <div className="flex flex-col gap-2">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
      ) : (
        <h2>No message yet</h2>
      )}
    </div>
  );
};

export default ChatMessages;
