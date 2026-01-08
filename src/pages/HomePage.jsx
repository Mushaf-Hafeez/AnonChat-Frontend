// importing custom components
import Navbar from "@/custom_components/Navbar";

// importing components
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <section className="h-screen w-full">
      <Navbar />

      {/* hero section */}
      <div className="mt-[25vh] col-center gap-4 max-w-11/12 md:max-w-1/2 mx-auto text-center">
        {/* main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold">
          <p className="whitespace-nowrap">Connect Anonoymously</p>
          <p>Chat Securely</p>
        </h1>
        {/* main description */}
        <p className="text-neutral-600 max-w-3/4">
          A safe space for university students to communicate, collaborate and
          share without revealing personal identities.
        </p>

        {/* actions buttons */}

        <Button onClick={handleClick} className={"rounded-full cursor-pointer"}>
          Get started <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default HomePage;
