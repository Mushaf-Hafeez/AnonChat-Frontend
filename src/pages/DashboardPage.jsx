import { Outlet } from "react-router-dom";

import DashboardSidebar from "@/custom_components/DashboardSidebar";
import AdminGreet from "@/custom_components/AdminGreet";

const DashboardPage = () => {
  return (
    <section className="h-screen w-full flex gap-4 bg-neutral-200">
      {/* dashboard sidebar */}
      <DashboardSidebar />

      {/* Nested components will be rendered here */}
      <div className="h-full w-full bg-white rounded-xl p-4 flex flex-col gap-8">
        <AdminGreet />
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardPage;
