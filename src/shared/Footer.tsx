import React from "react";
import Link from "next/link";

const Footer = React.memo(() => {
  return (
    <div className="bg-[#18253a] text-gray-300 py-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold">Tour Share</p>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
        <div>
          <ul className="md:flex extraSm:grid extraSm:grid-rows-5 md:space-x-4">
            <li>
              <Link href="/home" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                About
              </Link>
            </li>

            <li>
              <Link href="/createTeam/#createTeam" className="hover:text-white">
                Create Team
              </Link>
            </li>

            <li>
              <Link href="#" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

Footer.displayName = "Footer";

export default Footer;
