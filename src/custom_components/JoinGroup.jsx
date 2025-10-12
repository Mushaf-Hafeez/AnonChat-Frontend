import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Check, Plus, Search, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { searchGroup } from "@/services/group";

const JoinGroup = ({ toggleMode }) => {
  const { user } = useSelector((state) => state.User);

  const [groups, setGroups] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // hasAlreadyJoined function
  const hasAlreadyJoined = (groupId) => {
    const index = user.joinedGroups.findIndex((group) => group._id == groupId);
    return index === -1 ? false : true;
  };

  // onSubmit handler function
  const onSubmit = async (data) => {
    const response = await searchGroup(data.groupName);

    if (response.success) {
      setGroups(response.groups);
      reset();
    }
  };

  // Todo: send the group join request to the group admin

  return (
    <>
      <DialogHeader>
        <DialogTitle className={"self-start md:self-center"}>
          Join group
        </DialogTitle>
        <DialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-2 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <Input
                type={"text"}
                placeholder={"Search for a group..."}
                className={"text-neutral-800"}
                {...register("groupName", {
                  required: { value: true, message: "Group name is required." },
                  maxLength: {
                    value: 50,
                    message: "Name cannot contain more than 50 characters.",
                  },
                })}
              />
              <Button
                type="submit"
                size={"icon"}
                disabled={isSubmitting}
                className={"cursor-pointer rounded-full"}
              >
                {isSubmitting ? <Spinner /> : <Search />}
              </Button>
            </div>
            {errors && errors.groupName && (
              <p className="text-red-500 text-xs">{errors.groupName.message}</p>
            )}
          </form>

          {groups &&
            (Array.isArray(groups) && groups.length > 0 ? (
              <ul>
                {groups.map((group) => (
                  <li className="flex items-center justify-between ">
                    <div className="flex items-center gap-2">
                      <Users size="18" />
                      <h3>{group.groupName}</h3>
                    </div>

                    <Button
                      variant={"ghost"}
                      disabled={hasAlreadyJoined(group._id)}
                      size={"icon"}
                      className={`${
                        hasAlreadyJoined(group._id)
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {hasAlreadyJoined(group._id) ? <Check /> : <Plus />}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              "No group found"
            ))}
        </DialogDescription>
      </DialogHeader>

      {/* render if the user is the CR/GR */}
      {(user.role === "CR" || user.role === "GR") && (
        <Button
          variant={"ghost"}
          className={"cursor-pointer"}
          onClick={toggleMode}
        >
          Create group
        </Button>
      )}
    </>
  );
};

export default JoinGroup;
