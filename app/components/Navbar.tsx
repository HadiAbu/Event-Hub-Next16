import Link from "next/link";
import React from "react";
import ExploreBtn from "./ExploreBtn";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <img src="/icons/logo" alt="logo" />
      <div className="justify-right space-x-4">
        <Link href="/">
          <span>Explore</span>
        </Link>
        <Link href="/">About</Link>
        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Sign In
        </button> */}
        <ExploreBtn />
      </div>
    </div>
  );
};

export default Navbar;
