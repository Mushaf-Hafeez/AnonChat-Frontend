import React, { useEffect, useState } from "react";

// importing custom components
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Spinner from "./Spinner";

import { getMessages } from "@/services/message";
import { useDispatch, useSelector } from "react-redux";
import { setGroups } from "@/redux/slices/userSlice";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const { isSelected, selectedGroup, socket } = useSelector(
    (state) => state.Group
  );
  const dispatch = useDispatch();

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
  }, [selectedGroup]);

  // for socket
  useEffect(() => {
    socket.on("new-message", ({ message, joinedGroups }) => {
      if (selectedGroup && message.group._id === selectedGroup._id) {
        setMessages((prev) => [...prev, message]);

        // place the group to the front of the joinedGroups in the state
        dispatch(setGroups(joinedGroups));
      }
    });

    // listen to the delete message event
    socket.on("delete-message", (data) => {
      console.log("data in delete message event: ", data);

      if (isSelected && selectedGroup._id === data.groupId) {
        const filteredMessages = messages.filter(
          (message) => message._id !== data.messageId
        );
        setMessages(filteredMessages);
      }
    });

    return () => {
      socket.off("new-message");
      socket.off("delete-message");
    };
  }, []);

  return (
    <div className="bg-white h-full w-full p-4 rounded-xl shadow-xl overflow-y-auto flex flex-col justify-between">
      {isLoading ? <Spinner /> : <ChatMessages messages={messages} />}
      {/* Chat Input */}
      <ChatInput />
    </div>
  );
};

export default Chat;
