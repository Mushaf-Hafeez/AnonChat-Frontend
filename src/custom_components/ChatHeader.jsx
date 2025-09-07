import { setIsSelected, setSelectedGroup } from "@/redux/slices/groupSlice";
import { X } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatHeader = () => {
  const { selectedGroup } = useSelector((state) => state.Group);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsSelected(false));
    dispatch(setSelectedGroup(null));
  };

  return (
    <div className="p-4 flex-center justify-between shadow-xl">
      <div>
        <h2 className="text-2xl font-medium">{selectedGroup.groupName}</h2>
        <p className="text-sm text-neutral-500">
          {selectedGroup.description.slice(0, 40) + "..."}
        </p>
      </div>

      <X onClick={handleClick} className="cursor-pointer" />
    </div>
  );
};

export default ChatHeader;
