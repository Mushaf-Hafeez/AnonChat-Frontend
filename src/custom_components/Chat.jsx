import React, { useEffect, useState } from "react";

// importing custom components
import ChatInuput from "./ChatInuput";
import ChatMessages from "./ChatMessages";
import Spinner from "./Spinner";

import { getMessages } from "@/services/message";
import { useSelector } from "react-redux";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const { selectedGroup } = useSelector((state) => state.Group);

  // fetch messages function
  const fetchMessages = async () => {
    setIsLoading(true);

    const response = await getMessages(selectedGroup._id);

    if (response.success) {
      setMessages(response.messages);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-white h-full w-full p-4 rounded-xl shadow-xl overflow-y-auto flex flex-col justify-between">
      {isLoading ? <Spinner /> : <ChatMessages messages={messages} />}
      {/* Chat Input */}
      <ChatInuput />
    </div>
  );
};

export default Chat;
