import React, { useEffect, useRef } from "react";

// importing custom components
import Message from "./Message";

const ChatMessages = ({ messages }) => {
  const chatContainer = useRef();

  // Todo: need to fix why sometime there is only one message in the messages array and when the user receive the new message the sender of that message is not visible

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo({
        top: chatContainer.current.scrollHeight + 100,
        behavior: "smooth",
      });
    }
  }, [messages]);

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
