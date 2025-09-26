import React from "react";
import { useSelector } from "react-redux";

import FileRenderer from "./FileRenderer";

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.User);

  const isoString = message.createdAt;

  // Convert to Date object
  const date = new Date(isoString);

  // Format options
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // this makes it AM/PM
  };

  // Format using toLocaleString
  const formatted = date.toLocaleString("en-PK", options);

  return (
    <div
      className={`flex gap-2 ${
        message.sender._id === user._id && "self-end flex-row-reverse"
      }  `}
    >
      <img
        src="avatar.jpg"
        alt="Error"
        className="size-12 rounded-full object-cover shadow-md shadow-neutral-500"
      />

      <div
        className={`max-w-60 sm:max-w-80 lg:max-w-xs p-2 rounded space-y-2 bg-neutral-100 shadow-md shadow-neutral-400`}
      >
        <h2 className="text-sm">
          {user.role === "CR" || user.role === "GR"
            ? message.sender.rollno
            : user._id === message.sender._id
            ? "You"
            : "Anonymous user"}
        </h2>
        {message.content && <p className="text-sm">{message.content}</p>}

        <div className="flex flex-col gap-2">
          {message?.attachment?.map((file, index) => (
            <FileRenderer key={index} url={file} />
          ))}
        </div>
        <p className="text-xs text-neutral-600">{formatted}</p>
      </div>
    </div>
  );
};

export default Message;
