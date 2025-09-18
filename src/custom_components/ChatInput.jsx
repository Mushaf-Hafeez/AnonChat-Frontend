import React, { useEffect, useState } from "react";

import { ImageOff, Plus, Send } from "lucide-react";

import { toast } from "react-toastify";

import leoProfanity from "leo-profanity";

// importing components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// importing custom components
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { sendMessage } from "@/services/message";

const ChatInput = () => {
  leoProfanity.loadDictionary("en");

  const { selectedGroup } = useSelector((state) => state.Group);

  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [filesPreview, setFilesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // handleMessageChange function
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  //   handleFileChange function
  const handleFileChange = async (e) => {
    const fileArray = Array.from(e.target.files);

    setFiles(fileArray);

    const preview = fileArray.map((file, index) => ({
      id: index,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setFilesPreview(preview);
  };

  //   handleSelectedFileClick function
  const handleSelectedFileClick = (url) => {
    open(url, "_blank");
  };

  //   submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let updatedMessage;

    if (!message && files.length === 0) {
      toast.error("cannot send empty message");
      setIsLoading(false);
      return;
    }

    if (message) {
      const cleanMessage = leoProfanity.clean(message);
      updatedMessage = cleanMessage;
    }

    // Todo: create the formdata
    const formData = new FormData();

    if (message) {
      formData.append("message", updatedMessage);
    }

    if (files && files.length > 0) {
      files.map((file) => formData.append("attachment", file));
    }

    console.log(
      "Formdata is: ",
      formData.get("message"),
      formData.get("attachment")
    );

    const response = await sendMessage(selectedGroup._id, formData);

    if (response.success) {
      setMessage("");
      setFiles([]);
      setFilesPreview([]);
    }

    setIsLoading(false);
  };

  // Todo: implement real time communication using Socket.io

  return (
    <div className="w-full">
      <div className="max-w-full mb-2 flex gap-1 overflow-x-auto">
        {filesPreview &&
          filesPreview.length > 0 &&
          filesPreview.map((file, index) => (
            <div key={index} onClick={() => handleSelectedFileClick(file.url)}>
              {file.type.startsWith("image/") ? (
                <img
                  src={file.url}
                  alt={"Error"}
                  className="size-16 rounded object-cover cursor-pointer"
                />
              ) : (
                <div className="size-16 cursor-pointer flex-center rounded bg-neutral-200">
                  <ImageOff />
                </div>
              )}
            </div>
          ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        {/* Input for the message */}

        <div className="relative flex w-full">
          <Input
            type={"text"}
            value={message}
            onChange={handleMessageChange}
            placeholder={"Send a message..."}
            className={"bg-neutral-200 border-2 border-neutral-300"}
          />

          <Label
            htmlFor={"file"}
            className={"absolute top-1/2 -translate-y-1/2 right-2"}
          >
            <Plus className="bg-neutral-300 rounded-full p-1 text-neutral-600 cursor-pointer" />
          </Label>
          <Input
            id={"file"}
            type={"file"}
            className={"hidden"}
            multiple
            onChange={handleFileChange}
          />
        </div>

        <Button disabled={isLoading} size={"icon"} className={"cursor-pointer"}>
          {isLoading ? <Spinner /> : <Send />}
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
