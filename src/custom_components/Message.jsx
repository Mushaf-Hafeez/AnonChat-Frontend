import React from "react";
import { useSelector } from "react-redux";

import FileRenderer from "./FileRenderer";
import { EllipsisVertical, ShieldAlert, Trash2 } from "lucide-react";

// importing components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import { deleteMessage, reportMessage } from "@/services/message";

const Message = ({ message, setMessages }) => {
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

  // handleMessageDelete function
  const handleMessageDelete = async (messageId, groupId) => {
    const response = await deleteMessage(messageId, groupId);

    if (response.success) {
      // update the messages state to remove the deleted message
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      toast.success("Message has been deleted");
    } else {
      toast.error(response.message);
    }
  };

  // handleMessageReport function
  const handleMessageReport = async (messageId, groupId) => {
    // call the report message api
    const response = await reportMessage(groupId, messageId);

    if (response.success) {
      toast.success(response.message);
    }
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

      <div
        className={`max-w-60 sm:max-w-80 lg:max-w-xs p-2 rounded space-y-2 bg-neutral-100 shadow-md shadow-neutral-400`}
      >
        <div className="flex items-center justify-between gap-10">
          <h2 className="text-sm font-medium">
            {user.rollno === message.sender.rollno
              ? "You"
              : user.role === "CR" || user.role === "GR"
              ? message.sender.rollno
              : "Anonymous user"}
          </h2>

          {/* options for the message */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical size={16} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* Show the delete option if user is the sender of that message and to the CR and GR */}
              {(message.sender._id === user._id ||
                user.role === "CR" ||
                user.role === "GR") && (
                <DropdownMenuItem
                  className={
                    "flex items-center gap-2 hover:bg-neutral-200 cursor-pointer"
                  }
                  onClick={() =>
                    handleMessageDelete(message._id, message.group)
                  }
                >
                  <Trash2 className="text-neutral-600" />
                  Delete
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                className={
                  "flex items-center gap-2 hover:bg-neutral-200 cursor-pointer"
                }
                onClick={() =>
                  handleMessageReport(message._id, message.group._id)
                }
              >
                <ShieldAlert className="text-neutral-600" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
