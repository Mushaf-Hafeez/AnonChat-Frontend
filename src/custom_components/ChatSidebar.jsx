import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Logout from "@/custom_components/Logout";
import { EllipsisVertical, LogOut, Plus, Users } from "lucide-react";
import { setIsSelected, setSelectedGroup } from "@/redux/slices/groupSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
            <Plus size={16} className="font-medium cursor-pointer" />

            {/* Dropdown that show the logout button on the smaller screens */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="block md:hidden">
                <button
                  aria-label="More options"
                  className="hover:bg-gray-100 p-1 rounded transition-colors"
                >
                  <EllipsisVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="p-0"
                  onSelect={(e) => {
                    e.preventDefault(); // This prevents the dropdown from closing
                  }}
                >
                  <Logout isChatSidebar={true} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
