import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GroupAdminProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.User);

  if (user.role === "CR" || user.role === "GR") {
    return children;
  }

  return <Navigate to={"/unauthorized"} />;
};

export default GroupAdminProtectedRoute;
