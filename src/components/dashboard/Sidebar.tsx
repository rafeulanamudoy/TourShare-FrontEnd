"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logo.png";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faUser,
  faCircleXmark,
  faBook,
  faUsers,
  IconDefinition,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToggle } from "@/redux/features/toggle/toggleSlice";
import { usePathname } from "next/navigation";
import { ENUM_USER_ROLE } from "@/types/IUser";
import { useUserData } from "@/hooks/user/user";
export default function Sidebar() {
  const { toggle } = useAppSelector((state) => state.toggle);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const { role } = useAppSelector((state) => state.auth.user);
  const commonSidebarItems = [
    { title: "Profile", url: "/dashboard/profile", icon: faUser },
  ];

  // Define role-specific sidebar items
  const roleSpecificSidebarItems: Partial<
    Record<
      ENUM_USER_ROLE,
      { title: string; url: string; icon: IconDefinition }[]
    >
  > = {
    [ENUM_USER_ROLE.CUSTOMER]: [
      { title: "Booking", url: "/bookingHistory", icon: faBook },

      { title: "team", url: "/dashboard/team", icon: faPeopleGroup },
    ],

    [ENUM_USER_ROLE.SUPER_ADMIN]: [
      { title: "Manage Users", url: "/manageUsers", icon: faUsers },
    ],
    [ENUM_USER_ROLE.ADMIN]: [
      { title: "Delete Users", url: "/deleteUsers", icon: faUsers },
    ],
  };

  // Combine common and role-specific sidebar items
  const allSidebarItems = [
    ...commonSidebarItems,
    ...(roleSpecificSidebarItems[role] || []),
  ];

  const { isLoading } = useUserData();
  // console.log("sidebar renderd", role);

  if (isLoading) {
    return null;
  }

  return (
    <div
      className={`${
        toggle ? " w-80   md:w-24" : "md:w-80 text-[#31363F]   hidden lg:block"
      }  
        border-2     md:relative absolute bg-white`}
    >
      <div className="   flex  justify-end  p-5 md:hidden ">
        <button onClick={() => dispatch(setToggle())}>
          <FontAwesomeIcon
            style={{ width: "1.5em", height: "2em" }}
            icon={faCircleXmark}
          ></FontAwesomeIcon>
        </button>
      </div>
      <div className="   md:border-b-2     h-36 flex  items-center justify-center  ">
        <div className="      ">
          <Image
            className={`  `}
            src={logo}
            style={{
              width: `${toggle ? "70px" : "150px"}`,
              height: "auto",
            }}
            placeholder="blur"
            alt="logo"
          />
        </div>
      </div>
      <div className=" mt-5  2xl:text-[25px]   xl:text-[15px]   lg:text-[12px]  text-[8px]   grid  gap-y-5   ">
        {allSidebarItems.map(({ title, url, icon }) => (
          <Link
            className={` ${
              isActive(url) ? "bg-[#FF914F] " : ""
            } mx-auto  w-[90%] hover:bg-[#FF914F] flex    h-16 px-2 ${
              toggle ? "md:justify-center justify-between" : "justify-between"
            } items-center

           
            
            `}
            key={url}
            href={url}
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className=" "
                icon={icon}
              />

              <span
                className={` ${
                  toggle ? "md:hidden" : "block"
                } capitalize font-bold whitespace-nowrap `}
              >
                {title}
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "md:hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
