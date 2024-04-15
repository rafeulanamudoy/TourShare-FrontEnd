"use client";
import Link from "next/link";

import Image from "next/image";
import logo from "../../public/images/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

import { useRemoveAccount, useUserData } from "@/hooks/user/user";
import { roboto } from "@/app/styles/fonts";

export default function Header() {
  const isLoading = useUserData();
  console.log(isLoading, "loading check");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { email, profileImage } = useAppSelector((state) => state.auth.user);
  const handleLogOut = useRemoveAccount();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div
      className={`z-10  bg-white   lg:absolute top-0 w-full   lg:h-[25vh]  grid   lg:flex lg:justify-evenly items-center opacity-80 font-roboto 2xl:text-[25px]  xl:text-[15px]   lg:text-[12px]  text-[8px]     uppercase`}
    >
      <nav
        className={`${
          isMobileMenuOpen ? `lg:flex` : `hidden`
        }  lg:flex grid  mx-5 lg:mx-0   gap-x-5  gap-y-5 xl:gap-y-0  xl:gap-x-18  items-center font-semibold `}
      >
        {[
          ["home", "/"],
          ["create team", "/createTeam"],
          ["join team", "/joinTeam"],
          ["about us", "/about us"],
        ].map(([title, url]) => (
          <Link className="" key={url} href={url}>
            {title}
          </Link>
        ))}
      </nav>
      <div className=" order-first  lg:order-none my-5 lg:my-0    mx-5  lg:mx-0 flex items-center   justify-between  ">
        <div className=" overflow-hidden">
          <Image
            className="logo"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
            sizes="100vw"
            src={logo}
            placeholder="blur"
            alt="logo"
          />
        </div>

        <div className="lg:hidden    ">
          <button
            className="text-xl font-bold  text-black"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon className="  " icon={faBars} />
          </button>
        </div>
      </div>

      <nav
        className={`${
          isMobileMenuOpen ? `lg:flex` : `hidden`
        }   lg:flex gap-x-5  mx-5 lg:mx-0 mt-5 lg:mt-0   xl:gap-x-18  items-center  font-semibold  
        `}
      >
        <div>
          <Link className="  " href="/contact">
            contact
          </Link>
        </div>
        {email ? (
          <div className="lg:flex gap-x-5   xl:gap-x-18 h-16 items-center gap-y-5  mb-5 lg:mb-0  ">
            <button
              onClick={handleLogOut}
              className="  uppercase block my-5 lg:my-0"
            >
              sign out
            </button>
            <Link className="   " href="/dashboard">
              <div className="relative  w-8 h-8  lg:w-10 lg:h-10   xl:w-12 xl:h-12 2xl:w-14 2xl:h-14  rounded-full overflow-hidden ">
                <Image
                  src={profileImage.url}
                  alt="Picture of the author"
                  className="rounded-full"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
          </div>
        ) : (
          <div
            className={`${
              isMobileMenuOpen ? `lg:flex` : `hidden`
            } lg:flex gap-x-5    xl:gap-x-18 h-16 items-center `}
          >
            {[
              ["sign In", "/signIn#signIn", faRightFromBracket],
              ["sign up", "/signUp#signUp", faUserPlus],
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
        )}
      </nav>
    </div>
  );
}
