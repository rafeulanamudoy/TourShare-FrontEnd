"use client";

import Link from "next/link";

import Image from "next/image";
import logo from "../../public/Images/logo.png";
import { Roboto } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    //  console.log(isMobileMenuOpen);
  };
  return (
    <div
      className={`  z-10  bg-white   absolute top-0 w-full   lg:h-[13em]  grid   lg:flex lg:justify-evenly items-center opacity-80 font-roboto 2xl:text-[25px]  xl:text-[15px]   lg:text-[12px]  text-[8px]     uppercase ${roboto.className}`}
    >
      <nav
        className={`${
          isMobileMenuOpen ? `lg:flex` : `hidden`
        }  lg:flex grid  mx-5 lg:mx-0   gap-x-5  gap-y-5 xl:gap-y-0  xl:gap-x-18  items-center font-semibold  `}
      >
        {[
          ["home", "/home"],
          ["create team", "/createTeam"],
          ["join team", "/joinTeam"],
          ["about us", "/about us"],
        ].map(([title, url]) => (
          <Link key={url} href={url}>
            {title}
          </Link>
        ))}
      </nav>
      <div className=" order-first  lg:order-none my-5 lg:my-0   mx-5  lg:mx-0 flex items-center   justify-between  ">
        <div>
          <Image
            className="logo    "
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
            src={logo}
            placeholder="blur"
            alt="logo"
          />
        </div>

        <div className="lg:hidden   ml-5 my-5 ">
          <button
            className="text-xl font-bold  text-black"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      <nav
        className={`${
          isMobileMenuOpen ? `lg:flex` : `hidden`
        }   lg:flex gap-x-5  mx-5 lg:mx-0 my-5 lg:my-0   xl:gap-x-18  items-center  font-semibold 
        `}
      >
        <div>
          <Link className="  " href="/contact">
            contact
          </Link>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? `lg:flex` : `hidden`
          } lg:flex gap-x-5 my-5 lg:my-0   xl:gap-x-18 h-16 items-center `}
        >
          {[
            ["sign In", "/signIn", faRightFromBracket],
            ["sign up", "/signUp", faUserPlus],
          ].map(([title, url, icon], index) => (
            <div key={index} className="authButton  mt-5 lg:mt-0   ">
              <div>
                <Link
                  href={url as string}
                  className=" flex items-center gap-3 font-semibold "
                >
                  <FontAwesomeIcon
                    style={{ width: "1.1em", height: "1.1em" }}
                    icon={icon as IconProp}
                    className="lg:block hidden"
                  />
                  <div>{title as string}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
