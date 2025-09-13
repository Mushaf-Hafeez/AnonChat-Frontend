import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { ImageOff, Plus, Send } from "lucide-react";

import { toast } from "react-toastify";

import leoProfanity from "leo-profanity";

// importing components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// importing custom components
import Spinner from "./Spinner";

const ChatInuput = () => {
  leoProfanity.loadDictionary("en");

  const [filesPreview, setFilePreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  //   handleFileChange function
  const handleFileChange = (e) => {
    const fileArray = Array.from(e.target.files);
    const preview = fileArray.map((file, index) => ({
      id: index,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setFilePreview(preview);
  };

  //   handleSelectedFileClick function
  const handleSelectedFileClick = (url) => {
    open(url, "_blank");
  };

  //   submit function
  const onSubmit = (data) => {
    setIsLoading(true);

    const cleanMessage = leoProfanity.clean(data.message);
    toast(cleanMessage);

    // Todo: check if the selected file is not 18+

    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex gap-1">
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 w-full">
        {/* Input for the message */}

        <div className="relative flex w-full">
          <Input
            {...register("message")}
            type={"text"}
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
            {...register("file")}
            id={"file"}
            type={"file"}
            className={"hidden"}
            multiple
            onChange={handleFileChange}
          />
        </div>

        <Button
          disabled={isSubmitting}
          size={"icon"}
          className={"cursor-pointer"}
        >
          {isLoading ? <Spinner /> : <Send />}
        </Button>
      </form>
    </div>
  );
};

export default ChatInuput;
