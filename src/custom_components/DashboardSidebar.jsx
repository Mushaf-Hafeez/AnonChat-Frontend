import { NavLink } from "react-router-dom";

import * as icons from "lucide-react";

import { AdminDashboardSidebarLinks } from "@/constants/data";

import Logout from "./Logout";

const DashboardSidebar = () => {
  return (
    <aside className="w-2/12 h-full bg-white rounded-r-xl col-center justify-between items-start">
      <div className="w-full p-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="col-center gap-2 items-start">
          {AdminDashboardSidebarLinks.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <NavLink
                to={item.link}
                key={index}
                className={({ isActive }) =>
                  `${
                    isActive && "bg-neutral-800 text-white font-medium rounded"
                  } w-full flex items-center gap-2 px-2 py-2 text-neutral-500 `
                }
              >
                <Icon />
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4">
        <Logout />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
