import React from "react";
import { useSelector } from "react-redux";

import ChatHeader from "@/custom_components/ChatHeader";

const SelectedGroupPage = () => {
  const { selectedGroup } = useSelector((state) => state.Group);
  const { user } = useSelector((state) => state.User);

  return (
    <section className="bg-neutral-200 h-full w-full">
      {/* Todo: here in the selected chat page on the right side you show the group information with all its members and remove option if the user is admin */}
      <ChatHeader />

      {/* This part will contain two parts
      on the left side, there is the container that display all the members of the group to the group admin
      and on the right side, there is the message for the chat */}
      <div className="h-[87%] w-full flex-center gap-4 py-4">
        <div
          className={`bg-white h-full w-1/2 p-4 rounded-xl shadow-xl overflow-y-auto ${
            user.role === "CR" || user.role === "GR"
              ? "hidden lg:block"
              : "hidden"
          }`}
        >
          here is the list of all the members of the group.
        </div>

        <div className="bg-white h-full w-full p-4 rounded-xl shadow-xl overflow-y-auto">
          here is all the messages of the group.
        </div>
      </div>
    </section>
  );
};

export default SelectedGroupPage;
