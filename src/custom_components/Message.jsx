import React from "react";
import { useSelector } from "react-redux";

// import moment from "moment/moment";

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.User);

  //   const time = moment(message.createdAt).fromNow();

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

  // handleFileClick function
  const handleFileClick = (URL) => {
    window.open(URL, "_blank");
  };

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

      <div className="max-w-xs p-2 rounded space-y-2 bg-neutral-100 shadow-md shadow-neutral-400">
        <h2 className="text-sm">
          {user.role === "CR" || user.role === "GR"
            ? message.sender.rollno
            : user._id === message.sender._id
            ? "You"
            : "Anonymous user"}
        </h2>
        {message.content && <p className="text-sm">{message.content}</p>}
        <p className="text-xs text-neutral-600">{formatted}</p>

        <div className="flex flex-col gap-2">
          {message?.attachment?.map((file, index) => (
            <img
              key={index}
              src={file}
              alt="Error"
              className="w-full object-contain cursor-pointer"
              onClick={() => handleFileClick(file)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
