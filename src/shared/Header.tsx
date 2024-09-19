"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRemoveAccount } from "../hooks/user/user";

// import DashBoardModal from "../components/DashBoard/DashBoardModal";
import { ENUM_USER_ROLE, IUserSchema } from "../types/IUser";
import dynamic from "next/dynamic";
const LazyDashModal = dynamic(
  () => import("../components/DashBoard/DashBoardModal")
);
interface HeaderProps {
  user: IUserSchema;
}
const Header = React.memo(({ user }: HeaderProps) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleLogOut = useRemoveAccount();
  const [isModalOpen, setModalOpen] = useState(false);
  const profileImageRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div
      ref={headerRef}
      className={`z-10 bg-white absolute top-0 w-full lg:h-[25vh] grid lg:flex lg:justify-evenly items-center opacity-80 2xl:text-[22px]  xl:text-lg lg:text-base md:text-sm text-[10px] uppercase`}
    >
      <nav
        className={`${
          isMobileMenuOpen ? `lg:flex` : `hidden`
        } lg:flex grid mx-5 lg:mx-0 gap-x-5 xl:gap-x-18 gap-y-5 xl:gap-y-0 items-center font-semibold`}
      >
        {[
          ["home", "/"],
          ["create team", "/createTeam#createTeam"],
          ["Join team", "/#showTeam"],
        ].map(([title, url]) => (
          <Link className="" key={url} href={url}>
            {title}
          </Link>
        ))}
      </nav>
      <div className="order-first lg:order-none my-5 lg:my-0 mx-5 lg:mx-0 flex items-center justify-between">
        <div className="overflow-hidden">
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
            alt="logo"
            placeholder="blur"
          />
        </div>
        <div className="lg:hidden">
          <button
            className="text-xl font-bold text-black"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon className="" icon={faBars} />
          </button>
        </div>
      </div>

      <nav
        className={`${
          isMobileMenuOpen ? `lg:flex` : `hidden`
        } lg:flex gap-x-5 mx-5 lg:mx-0 mt-5 lg:mt-0 xl:gap-x-18 items-center font-semibold`}
      >
        <div>
          <Link className="" href="/contact#contact">
            contact
          </Link>
        </div>
        {user?.email ? (
          <div className="lg:flex gap-x-5 xl:gap-x-18 h-16 items-center gap-y-5 mb-5 lg:mb-0">
            <button
              onClick={handleLogOut}
              className="uppercase block my-5 lg:my-0"
            >
              sign out
            </button>

            <div
              className="relative w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full overflow-hidden cursor-pointer"
              onClick={toggleModal}
              ref={profileImageRef}
            >
              <Image
                src={user?.profileImage?.url}
                alt="Picture of the author"
                className="rounded-full"
                width={100}
                height={100}
              />
            </div>
          </div>
        ) : (
          <div
            className={`${
              isMobileMenuOpen ? `lg:flex` : `hidden`
            } lg:flex gap-x-5 xl:gap-x-18 h-16 items-center`}
          >
            {[
              ["sign In", "/signIn#signIn", faRightFromBracket],
              ["sign up", "/signUp#signUp", faUserPlus],
            ].map(([title, url, icon], index) => (
              <div key={index} className="authButton mt-5 lg:mt-0">
                <div>
                  <Link
                    href={url as string}
                    className="flex items-center gap-3 font-semibold"
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

      <LazyDashModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        targetRef={profileImageRef}
      >
        <div className="grid  2xl:w-[140px] xl:w-[115px] lg:min-w-full    gap-3">
          <div className="  mx-auto relative w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full overflow-hidden cursor-pointer">
            <Image
              src={user?.profileImage?.url}
              alt="Picture of the author"
              className="rounded-full"
              width={100}
              height={100}
            />
          </div>
          <h1 className="     lg:text-sm  text-xs text-white font-bold text-center">
            {user?.name.firstName} {user?.name.lastName}
          </h1>
          <Link
            href={"/dashboard/profile"}
            className=" grid rounded-md  2xl:leading-8 xl:leading-6 lg:leading-5 md:leading-4  leading-3 w-full j justify-center items-center  text-white font-bold  text-center  bg-[#FF914F]    lg:text-sm text-xs  capitalize"
          >
            {" "}
            view profile{" "}
          </Link>{" "}
          <nav className="    lg:text-sm text-xs capitalize text-white  grid gap-y-3">
            {user?.role === ENUM_USER_ROLE.CUSTOMER && (
              <>
                <Link href={"/dashboard/team"}>Your Team</Link>
                <hr className="leading-4 border-gray-500  " />
                <Link href={"/dashboard/joinTeam"}>Join Team</Link>
              </>
            )}
            {user?.role === ENUM_USER_ROLE.ADMIN && (
              <>
                <Link href={"/dashboard/manageTeam"}>Manage Team</Link>
                <hr className="leading-4 border-gray-500  " />
              </>
            )}
            {user?.role === ENUM_USER_ROLE.SUPER_ADMIN && (
              <>
                <Link href={"/dashboard/manageUsers"}>Manage Users</Link>
                <hr className="leading-4 border-gray-500  " />
                <Link href={"/dashboard/createAdmin"}>
                  Create Admin Account
                </Link>
              </>
            )}
          </nav>
        </div>
      </LazyDashModal>
    </div>
  );
});

Header.displayName = "Header";

export default Header;
