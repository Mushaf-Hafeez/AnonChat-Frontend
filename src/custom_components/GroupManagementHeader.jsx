import React from "react";

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { deleteGroup, updateGroup } from "@/services/group";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsSelected, setSelectedGroup } from "@/redux/slices/groupSlice";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";

import { removeGroup, removeMyGroup } from "@/redux/slices/userSlice";

const GroupManagementHeader = ({ groupData, setGroupData }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   handleDelete function
  const handleDelete = async () => {
    // Todo: add the delete functionality
    // remove the group from the user.joinedGroups and user.myGroups
    // make the api call to delete the group

    const response = await deleteGroup(groupData._id);

    console.log(response);

    if (response.success) {
      setGroupData(null);
      dispatch(setIsSelected(false));
      dispatch(setSelectedGroup(null));

      // remove the group from the user state in the redux

      // 1. remove the group from the user.myGroups
      dispatch(removeMyGroup(groupData._id));
      // 1. remove the group from the user.joinedGroups
      dispatch(removeGroup(groupData._id));

      // success toast
      toast.success(response.message);

      // redirect user to chatpage
      navigate("/");
    } else {
      toast.error(response.message);
    }
  };

  // onSubmit function
  const onSubmit = async (data) => {
    const response = await updateGroup(
      groupData._id,
      data.groupName,
      data.description
    );

    if (response.success) {
      setGroupData({
        ...groupData,
        groupName: data.groupName,
        description: data.description,
      });

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* dropdown for smaller screens */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="block md:hidden" size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"flex-col gap-1"}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Dialog className="w-full">
              <DialogTrigger className="flex items-center gap-2">
                <Pencil />
                Edit
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Edit group</DialogTitle>
                    <DialogDescription>
                      {groupData?.description && groupData.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="groupName">Group name</Label>
                      <Input
                        id="groupName"
                        name="groupName"
                        defaultValue={groupData?.groupName}
                        {...register("groupName", {
                          required: {
                            value: true,
                            message: "Group name is required.",
                          },
                          maxLength: {
                            value: 50,
                            message:
                              "Group name cannot contain more than 50 characters.",
                          },
                        })}
                      />
                      {errors && errors.groupName && (
                        <span className="text-sm text-red-500">
                          {errors.groupName.message}
                        </span>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Desription</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={groupData?.description}
                        {...register("description", {
                          maxLength: {
                            value: 100,
                            message:
                              "Description cannot be longer than 100 characters.",
                          },
                        })}
                      />
                      {errors && errors.description && (
                        <span className="text-sm text-red-500">
                          {errors.description.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <DialogFooter className={"my-4"}>
                    <DialogClose asChild>
                      <Button
                        onClick={() =>
                          reset({
                            groupName: groupData?.groupName,
                            description: groupData?.description,
                          })
                        }
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <Spinner /> : "Save changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <AlertDialog>
              <AlertDialogTrigger className="flex items-center gap-2">
                <Trash2 />
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    group and remove all the group from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className={"cursor-pointer"}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className={"cursor-pointer"}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit CTA for desktop screens */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={"hidden md:block cursor-pointer"}
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit group</DialogTitle>
              <DialogDescription>{groupData?.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="groupName">Group name</Label>
                <Input
                  id="groupName"
                  name="groupName"
                  defaultValue={groupData?.groupName}
                  {...register("groupName", {
                    required: {
                      value: true,
                      message: "Group name is required.",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Group name cannot contain more than 50 characters.",
                    },
                  })}
                />
                {errors && errors.groupName && (
                  <span className="text-red-500 text-sm">
                    {errors.groupName.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={groupData?.description}
                  {...register("description", {
                    maxLength: {
                      value: 100,
                      message:
                        "Description cannot be longer than 100 characters.",
                    },
                  })}
                />
                {errors && errors.description && (
                  <span className="text-sm text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter className={"my-4"}>
              <DialogClose asChild>
                <Button
                  onClick={() =>
                    reset({
                      groupName: groupData?.groupName,
                      description: groupData?.description,
                    })
                  }
                  variant="outline"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete dialog for desktop screens */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className={"hidden md:block cursor-pointer"}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete group
              and remove all the group from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={"cursor-pointer"}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className={"cursor-pointer"}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GroupManagementHeader;
