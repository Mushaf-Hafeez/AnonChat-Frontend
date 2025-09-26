import React, { useEffect } from "react";

import ChatSidebar from "@/custom_components/ChatSidebar";

import DefaultChatPage from "./DefaultChatPage";
import SelectedGroupPage from "./SelectedGroupPage";

import { useDispatch, useSelector } from "react-redux";

import { io } from "socket.io-client";
import { setSocket } from "@/redux/slices/groupSlice";
import { toast } from "react-toastify";

const backendURL = import.meta.env.VITE_BACKEND_URL;
let client;

const ChatPage = () => {
  const { isSelected, selectedGroup, socket } = useSelector(
    (state) => state.Group
  );
  const { user } = useSelector((state) => state.User);

  const dispatch = useDispatch();

  // socket connection
  useEffect(() => {
    if (user) {
      client = io(backendURL);
      dispatch(setSocket(client));

      client.emit("join-room", user.joinedGroups);
    }

    return () => {
      client.disconnect();
    };
  }, [user]);

  // Todo: fix notification issue

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (message.group._id !== selectedGroup?._id)
        toast.info(`New message in ${message.group.groupName}`);
    };

    socket.on("new-message", handleNewMessage);

    return () => socket.off("new-message", handleNewMessage);
  }, [selectedGroup, socket]);

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
