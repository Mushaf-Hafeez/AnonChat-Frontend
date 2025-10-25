import React from "react";
import { motion } from "motion/react";

const UnauthorizedPage = () => {
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
      className="h-screen w-full flex-center"
    >
      <h1 className="text-4xl font-semibold">401 - Unauthorized</h1>
    </motion.section>
  );
};

export default UnauthorizedPage;
