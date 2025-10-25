import React, { useEffect } from "react";

import { motion } from "motion/react";
import ChatSidebar from "@/custom_components/ChatSidebar";

import DefaultChatPage from "./DefaultChatPage";
import SelectedGroupPage from "./SelectedGroupPage";

import { useDispatch, useSelector } from "react-redux";

import { socket } from "@/utils/socket";
import {
  setIsSelected,
  setSelectedGroup,
  updateSelectedGroup,
} from "@/redux/slices/groupSlice";
import {
  addJoinGroup,
  removeGroup,
  removeMyGroup,
} from "@/redux/slices/userSlice";
import { toast } from "react-toastify";
import { updateGroup } from "@/services/group";

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

    // removeMember handler function
    const handleRemoveMember = (groupId) => {
      // console.log(groupId);
      // set the selectedGroup to null if the user selectedGroup = groupId
      if (selectedGroup && selectedGroup._id == groupId) {
        dispatch(setSelectedGroup(null));
        dispatch(setIsSelected(false));
      }

      // remove group from the users->joinedGroups
      dispatch(removeGroup(groupId));
    };

    // rejectRequest handler function
    const handleRejectRequest = ({ message }) => {
      toast.error(message);
    };

    // handleDeleteGroup handler function
    const handleDeleteGroup = (groupId) => {
      if (selectedGroup && selectedGroup._id == groupId) {
        dispatch(setIsSelected(false));
        dispatch(setSelectedGroup(null));
      }

      dispatch(removeGroup(groupId));
      dispatch(removeMyGroup(groupId));
    };

    // handleUpdateGroup handler function
    const handleUpdateGroup = ({ id, groupName, description }) => {
      console.log(id, groupName, description);

      if (selectedGroup && selectedGroup._id == id) {
        dispatch(updateSelectedGroup({ groupName, description }));
      }

      dispatch(updateGroup({ id, groupName, description }));
    };

    socket.on("connect", handleConnect);

    socket.on("add-member", handleAddMember);

    socket.on("remove-member", handleRemoveMember);

    socket.on("reject-request", handleRejectRequest);

    socket.on("delete-group", handleDeleteGroup);

    socket.on("update-group", handleUpdateGroup);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("add-member", handleAddMember);
      socket.off("remove-member", handleRemoveMember);
      socket.off("reject-request", handleRejectRequest);
      socket.off("delete-group", handleDeleteGroup);
      socket.off("update-group", handleUpdateGroup);
    };
  }, [dispatch, user?.joinedGroups, isSelected]); // remove user from the dependency array for testing

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="h-screen w-full flex gap-4 bg-neutral-200 overflow-auto"
    >
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
    </motion.section>
  );
};

export default ChatPage;
