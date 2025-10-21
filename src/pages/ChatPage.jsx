import React, { useEffect } from "react";

import ChatSidebar from "@/custom_components/ChatSidebar";

import DefaultChatPage from "./DefaultChatPage";
import SelectedGroupPage from "./SelectedGroupPage";

import { useDispatch, useSelector } from "react-redux";

import { socket } from "@/utils/socket";
import { setSelectedGroup } from "@/redux/slices/groupSlice";
import { addJoinGroup, removeGroup } from "@/redux/slices/userSlice";

const ChatPage = () => {
  const { isSelected, selectedGroup } = useSelector((state) => state.Group);
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  // socket connection
  useEffect(() => {
    socket.connect();

    // connect handler function
    const handleConnect = () => {
      socket.emit("userId", user._id);

      if (user?.joinedGroups.length > 0) {
        socket.emit("join-room", user.joinedGroups);
      }
    };

    // addMember handler function
    const handleAddMember = (group) => {
      // console.log(group);
      dispatch(addJoinGroup(group));
    };

    const handleRemoveMember = (groupId) => {
      // console.log(groupId);
      // set the selectedGroup to null if the user selectedGroup = groupId
      if (selectedGroup && selectedGroup._id == groupId) {
        dispatch(setSelectedGroup(null));
      }

      // remove group from the users->joinedGroups
      dispatch(removeGroup(groupId));
    };

    socket.on("connect", handleConnect);

    socket.on("add-member", handleAddMember);

    socket.on("remove-member", handleRemoveMember);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("add-member", handleAddMember);
      socket.off("remove-member", handleRemoveMember);
    };
  }, [dispatch, user?.joinedGroups]); // remove user from the dependency array for testing

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
