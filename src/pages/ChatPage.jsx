import React, { useEffect } from "react";

import ChatSidebar from "@/custom_components/ChatSidebar";

import DefaultChatPage from "./DefaultChatPage";
import SelectedGroupPage from "./SelectedGroupPage";

import { useSelector } from "react-redux";

import { socket } from "@/utils/socket";
import { toast } from "react-toastify";
import { MailCheck } from "lucide-react";

const ChatPage = () => {
  const { isSelected, selectedGroup } = useSelector((state) => state.Group);
  const { user } = useSelector((state) => state.User);

  // socket connection
  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      if (user?.joinedGroups.length > 0) {
        socket.emit("join-room", user.joinedGroups);
      }
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [user]);

  // Todo: fix notification issue

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = ({ message }) => {
      if (message.group._id !== selectedGroup?._id)
        toast.success(`New message in ${message.group.groupName}`, {
          icon: ({ theme, type }) => <MailCheck color="green" />,
        });
    };

    socket && socket.on("new-message", handleNewMessage);

    return () => socket.off("new-message", handleNewMessage);
  }, []); // for testing remove selectedGroup, socket from the dependency array

  return (
    <section className="h-screen w-full flex gap-4 bg-neutral-200 overflow-auto">
      {/* This is the sidebar of the chatpage */}

      <ChatSidebar />

      <div
        className={`${
          isSelected ? "block" : "hidden md:block"
        } bg-white w-full rounded-s-xl`}
      >
        {/* if there is a selected group then show the selected group page else show the default chatpage */}
        {isSelected ? <SelectedGroupPage /> : <DefaultChatPage />}
      </div>
    </section>
  );
};

export default ChatPage;
