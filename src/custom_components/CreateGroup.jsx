import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Spinner from "./Spinner";
import { createGroup } from "@/services/group";
import { toast } from "react-toastify";
import { addJoinGroup, addMyGroup } from "@/redux/slices/userSlice";

const CreateGroup = ({ toggleMode }) => {
  const { user } = useSelector((state) => state.User);

  console.log("User is: ", user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  // onSubmit function
  const onSubmit = async (data) => {
    const groupData = {
      groupName: data.groupName,
      description: data.description.replace(/(\n|\r)/gm, ""),
      semester: user.semester,
      section: user.section,
    };

    // call the create group axios function
    const response = await createGroup(groupData);

    if (response.success) {
      // add the group ID to the user state
      dispatch(addJoinGroup(response.group));
      dispatch(addMyGroup(response.group._id));
      toast.success(response.message);
      reset({
        groupName: "",
        description: "",
      });
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create group</DialogTitle>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor={"groupName"} className={"text-neutral-800"}>
            Group name:
          </Label>
          <Input
            type={"text"}
            id={"groupName"}
            placeholder={"Enter group name..."}
            className={`text-neutral-800 ${
              errors &&
              errors.groupName &&
              "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
            }`}
            {...register("groupName", {
              required: {
                value: true,
                message: "Group name is required.",
              },
              maxLength: {
                value: 50,
                message: "Group name cannot be longer than 50 characters.",
              },
            })}
          />
          {errors && errors.groupName && (
            <p className="text-xs text-red-500">{errors.groupName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={"description"} className={"text-neutral-800"}>
            Description:
          </Label>
          <Textarea
            id="description"
            cols="20"
            rows="4"
            className={`resize-none text-neutral-800 break-words overflow-wrap-anywhere ${
              errors &&
              errors.description &&
              "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
            }`}
            placeholder={"Enter description about the group..."}
            {...register("description", {
              maxLength: {
                value: 100,
                message: "Description cannot be longer than 100 characters.",
              },
            })}
          ></Textarea>
          {errors && errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          className={"cursor-pointer"}
          type={"submit"}
        >
          {isSubmitting ? <Spinner /> : "Create"}
        </Button>
      </form>

      <Button
        variant={"ghost"}
        className={"cursor-pointer"}
        onClick={toggleMode}
      >
        Join group
      </Button>
    </>
  );
};

export default CreateGroup;
