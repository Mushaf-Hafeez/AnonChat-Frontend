import React from "react";

// importing custom components
import ChatInuput from "./ChatInuput";

const Chat = () => {
  return (
    <div className="bg-white h-full w-full p-4 rounded-xl shadow-xl overflow-y-auto flex flex-col justify-between">
      <h1>Here all the chat will be displayed.</h1>
      {/* Chat Input */}
      <ChatInuput />
    </div>
  );
};

export default Chat;
