import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Logout from "@/custom_components/Logout";
import { EllipsisVertical, LogOut, Plus, Users } from "lucide-react";
import { setIsSelected, setSelectedGroup } from "@/redux/slices/groupSlice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogoutDropDown from "./LogoutDropDown";

const ChatSidebar = () => {
  const { user } = useSelector((state) => state.User);
  const { isSelected, selectedGroup } = useSelector((state) => state.Group);
  const dispatch = useDispatch();

  // handleClick function
  const handleClick = (group) => {
    dispatch(setIsSelected(true));
    dispatch(setSelectedGroup(group));
  };

  return (
    <aside
      className={`${
        isSelected && "hidden md:flex"
      } w-full md:w-2/12 h-full bg-white rounded-r-xl col-center justify-between items-start`}
    >
      <div className="h-fit overflow-y-auto w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="block text-xl font-semibold">Groups</h2>
          <div className="flex items-center gap-2">
            {/* button to create/join groups */}
            <Dialog>
              <DialogTrigger asChild>
                <Plus size={16} className="font-medium cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join group</DialogTitle>
                  <DialogDescription>List of groups</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* Dropdown that show the logout button on the smaller screens */}
            <LogoutDropDown />
          </div>
        </div>

        {/* group search functionality */}
        {/* Todo: add the search joined groups feature */}

        <div className="col-center gap-2 items-start text-neutral-600">
          {user &&
            user.joinedGroups &&
            user.joinedGroups.length > 0 &&
            user.joinedGroups.map((group, index) => (
              <span
                //   add the onclick event and add the id to the state in the redux
                key={index}
                onClick={() => handleClick(group)}
                className={`w-full p-2 flex items-center gap-4 cursor-pointer ${
                  selectedGroup &&
                  selectedGroup._id === group._id &&
                  "bg-neutral-800 text-white font-medium rounded"
                }`}
              >
                <Users />
                <p className="text-lg">{group.groupName}</p>
              </span>
            ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 hidden md:block">
        <Logout isChatSidebar={true} />
      </div>
    </aside>
  );
};

export default ChatSidebar;
