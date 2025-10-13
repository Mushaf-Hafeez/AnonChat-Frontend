import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Logout from "@/custom_components/Logout";
import { Users } from "lucide-react";
import { setIsSelected, setSelectedGroup } from "@/redux/slices/groupSlice";

import Group from "./Group";
import LogoutDropDown from "./LogoutDropDown";
import { Input } from "@/components/ui/input";

const ChatSidebar = () => {
  const { user } = useSelector((state) => state.User);
  const { isSelected, selectedGroup } = useSelector((state) => state.Group);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(
    structuredClone(user.joinedGroups)
  );
  // handleClick function
  const handleClick = (group) => {
    dispatch(setIsSelected(true));
    dispatch(setSelectedGroup(group));
    setSearch("");
  };

  // handleSearchChange function
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    const filtered =
      search && search.length > 0
        ? filteredGroups.filter((group) =>
            group.groupName.toLowerCase().includes(search.toLowerCase())
          )
        : structuredClone(user.joinedGroups);
    setFilteredGroups([...filtered]);
  }, [search]);

  return (
    <aside
      className={`${
        isSelected && "hidden md:flex"
      } w-full md:w-2/12 h-full bg-white rounded-r-xl col-center justify-between items-start`}
    >
      <div className="h-fit overflow-y-auto scrollbar-none w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="block text-xl font-semibold">Groups</h2>
          <div className="flex items-center gap-2">
            {/* button to create/join groups */}
            <Group />

            {/* Dropdown that show the logout button on the smaller screens */}
            <LogoutDropDown />
          </div>
        </div>

        {/* group search functionality */}
        <Input
          type={"text"}
          value={search}
          placeholder={"Search..."}
          className={"bg-neutral-200/90 my-2"}
          onChange={handleSearchChange}
        />

        <div className="col-center gap-2 items-start text-neutral-600 overflow-x-none">
          {/* change the user.joinedGroups to groups */}

          {filteredGroups &&
            filteredGroups.length > 0 &&
            filteredGroups.map((group, index) => (
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
                <span>
                  <Users size={22} />
                </span>
                {/* <p className="text-lg w-full shrink-0 overflow-x-auto">
                  Here is the name of the group
                </p> */}
                <p className="text-md leading-6 overflow-x-auto scrollbar-none">
                  {group.groupName}
                </p>
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
