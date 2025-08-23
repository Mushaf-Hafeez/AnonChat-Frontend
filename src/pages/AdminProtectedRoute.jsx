import Spinner from "@/custom_components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.Auth);
  const { user } = useSelector((state) => state.User);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  if (user.role !== "SUPER_ADMIN") {
    return <Navigate to={"/unauthorized"} />;
  }

  return children;
};

export default AdminProtectedRoute;
