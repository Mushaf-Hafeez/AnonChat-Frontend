import { useState } from "react";

import { Plus } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// importing custom components
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";

const Group = () => {
  const [isCreateGroup, setIsCreateGroup] = useState(false);

  const toggleMode = () => {
    setIsCreateGroup((prev) => !prev);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus size={16} className="font-medium cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        {isCreateGroup ? (
          <CreateGroup toggleMode={toggleMode} />
        ) : (
          <JoinGroup toggleMode={toggleMode} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Group;
