import React from "react";
import { useSelector } from "react-redux";

// importing custom component
import Spinner from "@/custom_components/Spinner";

const HomePage = () => {
  const { isAuth } = useSelector((state) => state.Auth);
  const { user } = useSelector((state) => state.User);

  // if (!isAuth && !user) {
  //   return <Spinner />;
  // }

  return (
    <section className="h-screen w-full flex-center">
      <h1 className="text-4xl font-semibold">
        This is Homepage of the AnonChat.
        <p>{isAuth && user.name && `${user.name}`}</p>
      </h1>
    </section>
  );
};

export default HomePage;
