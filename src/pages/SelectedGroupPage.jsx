import React from "react";
import { useSelector } from "react-redux";

import ChatHeader from "@/custom_components/ChatHeader";

const SelectedGroupPage = () => {
  const { selectedGroup } = useSelector((state) => state.Group);

  return (
    <section className="h-full w-full">
      <ChatHeader />
    </section>
  );
};

export default SelectedGroupPage;
