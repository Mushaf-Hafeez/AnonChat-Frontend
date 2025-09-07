import { LogOut } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const { user } = useSelector((state) => state.User);

  console.log("user is: ", user);

  return (
    <section className="h-screen w-full flex gap-4 bg-neutral-200">
      <aside className="w-fit lg:w-2/12 h-full bg-white rounded-r-xl col-center justify-between lg:items-start">
        <div className="w-full p-4">
          <h2 className="hidden lg:block text-xl font-semibold mb-4">Chat</h2>
          <div className="col-center gap-2 items-start">
            here all the joined groups will be displayed
          </div>
        </div>

        {/* Logout */}
        <div className="p-4">
          <LogOut />
        </div>
      </aside>
      <div className="bg-white w-full p-4 rounded-s-xl">
        this is the message container
      </div>
    </section>
  );
};

export default ChatPage;
