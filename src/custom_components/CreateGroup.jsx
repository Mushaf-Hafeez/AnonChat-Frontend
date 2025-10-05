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

const CreateGroup = ({ toggleMode }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create group</DialogTitle>
        <DialogDescription>
          Here is the form to create new group
          {/* create the form to take the data and create the group in the database */}
        </DialogDescription>
      </DialogHeader>
      <Button className={"rounded-full cursor-pointer"} onClick={toggleMode}>
        Join group
      </Button>
    </DialogContent>
  );
};

export default CreateGroup;
