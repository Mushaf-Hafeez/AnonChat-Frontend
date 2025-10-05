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
import { useSelector } from "react-redux";

const JoinGroup = ({ toggleMode }) => {
  const { user } = useSelector((state) => state.User);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Join group</DialogTitle>
        <DialogDescription>List of groups</DialogDescription>

        {/* Here you have to list all the groups with the same section and semester as the user's and also exclude those user has already joined*/}
      </DialogHeader>

      {/* render if the user is the CR/GR */}
      {(user.role === "CR" || user.role === "GR") && (
        <Button className={"rounded-full cursor-pointer"} onClick={toggleMode}>
          Create group
        </Button>
      )}
    </DialogContent>
  );
};

export default JoinGroup;
