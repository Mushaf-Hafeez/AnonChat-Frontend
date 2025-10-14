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

const GroupManagementHeader = ({ groupData }) => {
  // Todo: add the onClick listeners on edit and delete

  //   handleDelete function
  const handleDelete = () => {
    toast.success("Group deleted ", groupData._id);

    // Todo: add the delete functionality
    // remove the group from the user.joinedGroups and user.myGroups
    // make the api call to delete the group
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
              <form>
                <DialogTrigger className="flex items-center gap-2">
                  <Pencil />
                  Edit
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit group</DialogTitle>
                    <DialogDescription>
                      {groupData.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="groupName">Group name</Label>
                      <Input
                        id="groupName"
                        name="groupName"
                        defaultValue={groupData.groupName}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Desription</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={groupData.description}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
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
        <form>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={"hidden md:block cursor-pointer"}
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit group</DialogTitle>
              <DialogDescription>{groupData.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="groupName">Group name</Label>
                <Input
                  id="groupName"
                  name="groupName"
                  defaultValue={groupData.groupName}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={groupData.description}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
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
