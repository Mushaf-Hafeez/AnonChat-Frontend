// importing custom components
import Navbar from "@/custom_components/Navbar";

// importing components
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="h-screen w-full">
      <Navbar />

      {/* hero section */}
      <div className="mt-[25vh] col-center gap-4 max-w-11/12 md:max-w-1/2 mx-auto text-center">
        {/* main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold">
          Connect Anonoymously Chat Securely
        </h1>
        {/* main description */}
        <p className="text-neutral-600 max-w-3/4">
          A safe space for university students to communicate, collaborate and
          share without revealing personal identities.
        </p>

        {/* actions buttons */}
        <div className="flex-center gap-2">
          <Button>
            <Link to={"/login"}>Login</Link>
          </Button>
          <Button>
            <Link to={"/signup"}>Signup</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
