// importing components
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-4 flex-center justify-between shadow-xl">
      {/* logo */}
      <div className="flex-center gap-2 cursor-pointer">
        <img
          src="/logo.png"
          alt="error while rendering the logo"
          className="size-12 rounded-full"
        />
        <h2 className="font-semibold text-lg">AnonChat</h2>
      </div>

      {/* navitems */}
      <nav className="flex-center gap-2">
        <Button>
          <Link to={"/login"}>Login</Link>
        </Button>
        <Button>
          <Link to={"/signup"}>Signup</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
