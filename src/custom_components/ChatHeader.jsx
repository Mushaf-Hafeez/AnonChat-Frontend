import { setIsSelected, setSelectedGroup } from "@/redux/slices/groupSlice";
import { ArrowLeft, EllipsisVertical, LogOut } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const ChatHeader = () => {
  const [iseMenuOpen, setIsMeunOpen] = useState(false);
  const menuRef = useRef(null);

  const { selectedGroup } = useSelector((state) => state.Group);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsSelected(false));
    dispatch(setSelectedGroup(null));
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMeunOpen((prev) => !prev);
  };

  const handleHeaderClick = (e) => {
    if (e.target != menuRef.current) {
      setIsMeunOpen(false);
    }
  };

  const handleGroupLeave = () => {
    dispatch(setIsSelected(false));
    dispatch(setSelectedGroup(null));
    toast.success("Group leaved");
    // Todo: add the group leave functionality
  };

  return (
    <div
      onClick={(e) => handleHeaderClick(e)}
      className="bg-white p-4 flex-center justify-between shadow-xl rounded-b-xl"
    >
      <div className="flex items-center gap-2">
        <ArrowLeft onClick={handleClick} className="cursor-pointer" size={18} />
        <div>
          <h2 className="text-xl font-medium">{selectedGroup.groupName}</h2>
          <p className="text-sm text-neutral-500">
            {selectedGroup.description.slice(0, 40) + "..."}
          </p>
        </div>
      </div>

      {/* menu icon */}
      <div className="relative h-full">
        <EllipsisVertical
          size={18}
          className="cursor-pointer"
          onClick={handleMenuToggle}
        />
        <div
          ref={menuRef}
          className={`bg-white border border-neutral-300 absolute z-50 top-3/4 right-0 mt-2 p-2 rounded-lg ${
            iseMenuOpen ? "block" : "hidden"
          }`}
        >
          <Dialog>
            <DialogTrigger>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 cursor-pointer text-neutral-600"
              >
                <LogOut size={18} />
                Exit Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Exit group?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to leave the group.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" onClick={handleGroupLeave}>
                    Leave
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
