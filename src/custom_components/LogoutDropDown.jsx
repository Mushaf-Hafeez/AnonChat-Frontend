import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./Logout";
import { EllipsisVertical } from "lucide-react";

const LogoutDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="block md:hidden">
        <button
          aria-label="More options"
          className="hover:bg-gray-100 p-1 rounded transition-colors cursor-pointer"
        >
          <EllipsisVertical size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="p-0"
          onSelect={(e) => {
            e.preventDefault(); // This prevents the dropdown from closing
          }}
        >
          <Logout isChatSidebar={true} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutDropDown;
