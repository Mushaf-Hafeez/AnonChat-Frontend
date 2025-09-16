import { File } from "lucide-react";
import React from "react";

const FileRenderer = ({ url }) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];

  const lastIndex = url.split(".").length - 1;
  const extension = url.split(".")[lastIndex].toLowerCase();

  const isImage = imageExtensions.includes(extension);

  const handleClick = () => {
    window.open(url, "_blank");
  };

  if (isImage) {
    return (
      <img
        src={url}
        alt="Error"
        className="w-full object-contain cursor-pointer"
        onClick={handleClick}
      />
    );
  } else {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded p-2  flex items-center gap-2"
      >
        <File />
        <span className="text-sm text-blue-600 underline">File</span>
      </a>
    );
  }
};

export default FileRenderer;
