import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.Auth);
  const { user } = useSelector((state) => state.User);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  if (user.role === "SUPER_ADMIN") {
    return <Navigate to={"/unauthorized"} />;
  }

  return children;
};

export default StudentProtectedRoute;
