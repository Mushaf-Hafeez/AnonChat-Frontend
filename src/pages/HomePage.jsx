import React from "react";
import { useDispatch, useSelector } from "react-redux";

// importing custom component
import { logout } from "@/services/auth";
import { setIsAuth } from "@/redux/slices/authSlice";
import { clearUser } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuth } = useSelector((state) => state.Auth);
  const { user } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();

    if (response.success) {
      dispatch(setIsAuth(false));
      dispatch(clearUser());
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <section className="h-screen w-full flex-center">
      <h1 className="text-4xl font-semibold">
        This is Homepage of the AnonChat.
        <p>{isAuth && user.name && `${user.name}`}</p>
      </h1>
      {isAuth && <button onClick={handleLogout}>Logout</button>}
    </section>
  );
};

export default HomePage;
