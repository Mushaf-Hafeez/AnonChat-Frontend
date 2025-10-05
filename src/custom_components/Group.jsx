import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

const Group = () => {
  return (
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
  );
};

export default Group;
