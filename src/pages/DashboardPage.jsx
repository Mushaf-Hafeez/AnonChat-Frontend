import { Outlet } from "react-router-dom";

import DashboardSidebar from "@/custom_components/DashboardSidebar";
import AdminGreet from "@/custom_components/AdminGreet";

import { motion } from "motion/react";

const DashboardPage = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="h-screen w-full flex gap-4 bg-neutral-200"
    >
      {/* dashboard sidebar */}
      <DashboardSidebar />

      {/* Nested components will be rendered here */}
      <div className="h-full w-full bg-white rounded-xl p-4 flex flex-col gap-8 overflow-y-auto">
        <AdminGreet />
        <Outlet />
      </div>
    </motion.section>
  );
};

export default DashboardPage;
