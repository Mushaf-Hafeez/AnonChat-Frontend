import React from "react";
import { socket } from "@/utils/socket";
import { LogOut } from "lucide-react";

// importing components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/slices/userSlice";
import { setIsAuth } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { setIsSelected, setSelectedGroup } from "@/redux/slices/groupSlice";

const Logout = ({ isChatSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();

    if (response.success) {
      localStorage.clear();
      dispatch(clearUser());
      dispatch(setIsAuth(false));
      dispatch(setIsSelected(false));
      dispatch(setSelectedGroup(null));

      socket.disconnect();

      toast.success("Logout successful");
      navigate("/");
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className={
          "p-2 text-neutral-600 flex items-center gap-2 cursor-pointer"
        }
      >
        <LogOut size={20} />
        <span className={`${isChatSidebar ? "block" : "hidden lg:block"}`}>
          Logout
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you leaving?</DialogTitle>
          <DialogDescription>Are you sure want to logout?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleLogout}>Logout</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
