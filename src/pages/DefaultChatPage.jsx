import React from "react";

const DefaultChatPage = () => {
  return (
    <section className="h-full w-full col-center gap-4">
      <img
        src="/logo.png"
        alt="Error while rendering the logo"
        className="size-20 rounded animate-bounce"
      />
      <div className="text-center">
        <h2 className="text-2xl font-medium">Welcome to AnonChat</h2>
        <p className="text-sm text-neutral-500">
          Select a group to continue chat
        </p>
      </div>
    </section>
  );
};

export default DefaultChatPage;
