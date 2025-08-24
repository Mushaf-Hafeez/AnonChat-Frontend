import React from "react";

import DashboardSidebar from "@/custom_components/DashboardSidebar";

const DashboardPage = () => {
  return (
    <section className="h-screen w-full bg-neutral-200">
      {/* dashboard sidebar */}
      <DashboardSidebar />
    </section>
  );
};

export default DashboardPage;
