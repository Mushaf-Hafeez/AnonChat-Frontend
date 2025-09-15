import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatHeader from "@/custom_components/ChatHeader";

import { getGroupData, removeMember } from "@/services/group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { X } from "lucide-react";
import { toast } from "react-toastify";
import Chat from "@/custom_components/Chat";

const SelectedGroupPage = () => {
  const [groupDetails, setGroupDetails] = useState(null);

  const [searchedRollno, setSearchedRollno] = useState("");
  const [filteredRollnos, setFilteredRollnos] = useState([]);

  const { selectedGroup } = useSelector((state) => state.Group);
  const { user } = useSelector((state) => state.User);

  // handleRollnoChange function
  const handleRollnoChange = (e) => {
    setSearchedRollno(e.target.value);
  };

  // handleMemberRemove function
  const handleMemberRemove = async (memberID) => {
    const response = await removeMember(selectedGroup._id, memberID);

    if (response.success) {
      const updatedMembers = groupDetails.members.filter(
        (member) => member._id !== memberID
      );

      setGroupDetails((prev) => ({
        ...prev,
        members: updatedMembers,
      }));

      const updatedFiltered = filteredRollnos.filter(
        (member) => member._id !== memberID
      );
      setFilteredRollnos(updatedFiltered);
      toast.success(`Member has been removed`);
    }
  };

  // fetchGroupData function
  const fetchGroupData = async (groupID) => {
    const response = await getGroupData(groupID);

    if (response.success) {
      setGroupDetails(response.groupData);
      setFilteredRollnos(response.groupData.members);
    }
  };

  useEffect(() => {
    if (selectedGroup && selectedGroup._id) {
      fetchGroupData(selectedGroup._id);
    }
  }, [selectedGroup]);

  useEffect(() => {
    const filteredData = searchedRollno
      ? groupDetails?.members.filter((member) =>
          member.rollno.toLowerCase().includes(searchedRollno.toLowerCase())
        )
      : groupDetails?.members;

    if (filteredData) setFilteredRollnos(filteredData);
  }, [searchedRollno]);

  // Todo: get the details of the selected group from the backend and display all the members in the left side container

  return (
    <section className="bg-neutral-200 h-full w-full">
      {/* Todo: here in the selected chat page on the right side you show the group information with all its members and remove option if the user is admin */}
      <ChatHeader />

      {/* This part will contain two parts
      on the left side, there is the container that display all the members of the group to the group admin
      and on the right side, there is the message for the chat */}
      <div className="h-[87%] w-full flex-center gap-4 py-4">
        <div
          className={`bg-white h-full w-1/2 p-4 rounded-xl shadow-xl overflow-y-auto ${
            user.role === "CR" || user.role === "GR"
              ? "hidden lg:block"
              : "hidden"
          }`}
        >
          <h2 className="text-xl font-medium">{groupDetails?.groupName}</h2>
          <p className="text-sm text-neutral-600">
            {groupDetails?.description}
          </p>
          {groupDetails && (
            <h3 className="text-lg font-medium mt-4">
              Group Members ({groupDetails.members.length})
            </h3>
          )}

          {/* Search Input */}
          <Input
            variant="outlined"
            className={"my-2"}
            placeholder={"Search rollno"}
            value={searchedRollno}
            onChange={(e) => handleRollnoChange(e)}
          ></Input>

          <ul className="flex flex-col gap-2">
            {filteredRollnos &&
              filteredRollnos.length > 0 &&
              filteredRollnos.map((member) => (
                <li
                  key={member._id}
                  className="flex items-center justify-between p-2 rounded-lg shadow-md border border-neutral-300"
                >
                  <h3>{member.rollno}</h3>
                  {!(member.role === "CR" || member.role === "GR") ? (
                    <Button
                      size={"icon"}
                      type={"button"}
                      variant={"secondary"}
                      className={"cursor-pointer"}
                      onClick={() => handleMemberRemove(member._id)}
                    >
                      <X />
                    </Button>
                  ) : (
                    <Badge className={"text-xs"}>ADMIN</Badge>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <Chat />
      </div>
    </section>
  );
};

export default SelectedGroupPage;
