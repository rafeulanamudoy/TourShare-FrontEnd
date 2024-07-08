"use client";
import Image from "next/image";
import React, { useState } from "react";
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
  faPeopleArrows,
  faMessage,
  faPeopleRoof,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToggle } from "@/redux/features/toggle/toggleSlice";
import { usePathname } from "next/navigation";
import { ENUM_USER_ROLE } from "@/types/IUser";
import { useUserData } from "@/hooks/user/user";
import NotificationModal from "../notifications/NotificationModal";

interface SidebarItem {
  title: string;
  url: string;
  icon: IconDefinition;
  count?: number; // Optional count property
}

export default function Sidebar() {
  const { toggle } = useAppSelector((state) => state.toggle);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const { role } = useAppSelector((state) => state.auth.user);
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const commonSidebarItems: SidebarItem[] = [
    { title: "Profile", url: "/dashboard/profile", icon: faUser },
    {
      title: "Message",
      url: "/dashboard/messages",
      icon: faMessage,
      count: notifications.length,
    },
  ];

  // Define role-specific sidebar items
  const roleSpecificSidebarItems: Partial<
    Record<ENUM_USER_ROLE, SidebarItem[]>
  > = {
    [ENUM_USER_ROLE.CUSTOMER]: [
      { title: "Your team", url: "/dashboard/team", icon: faPeopleGroup },
      { title: "Join Team", url: "/dashboard/joinTeam", icon: faPeopleArrows },
    ],
    [ENUM_USER_ROLE.SUPER_ADMIN]: [
      {
        title: "Manage Users",
        url: "/dashboard/manageUsers",
        icon: faPeopleRoof,
      },
      { title: "Create Admin", url: "/dashboard/createAdmin", icon: faUserTie },
    ],
    [ENUM_USER_ROLE.ADMIN]: [
      { title: "Delete Users", url: "/deleteUsers", icon: faUserTie },
    ],
  };

  // Combine common and role-specific sidebar items
  const allSidebarItems: SidebarItem[] = [
    ...commonSidebarItems,
    ...(roleSpecificSidebarItems[role] || []),
  ];

  const { isLoading } = useUserData();
  // console.log("sidebar rendered", role);

  if (isLoading) {
    return null;
  }

  return (
    <div
      className={`${
        toggle ? "w-80 md:w-24" : "md:w-80 text-[#31363F] hidden lg:block"
      } border-2 md:relative absolute bg-white`}
    >
      <div className="flex justify-end p-5 md:hidden">
        <button onClick={() => dispatch(setToggle())}>
          <FontAwesomeIcon
            style={{ width: "1.5em", height: "2em" }}
            icon={faCircleXmark}
          />
        </button>
      </div>
      <div className="md:border-b-2 h-36 flex items-center justify-center">
        <Image
          className=""
          src={logo}
          style={{
            width: `${toggle ? "70px" : "150px"}`,
            height: "auto",
          }}
          placeholder="blur"
          alt="logo"
        />
      </div>
      <div className="mt-5 2xl:text-[25px] xl:text-[15px] lg:text-[12px] text-[8px] grid gap-y-5">
        {allSidebarItems.map(({ title, url, icon, count }) => (
          <Link
            className={`${
              isActive(url) ? "bg-[#FF914F] " : ""
            } mx-auto w-[90%] hover:bg-[#FF914F] flex h-16 px-2 ${
              toggle ? "md:justify-center justify-between" : "justify-between"
            } items-center`}
            key={url}
            href={url}
          >
            <div className="relative flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                icon={icon}
              />

              <span
                className={`${
                  toggle ? "md:hidden" : "block"
                } capitalize font-bold whitespace-nowrap`}
              >
                {title}
              </span>
            </div>
            <FontAwesomeIcon
              style={{ width: "1.5em", height: "1.5em" }}
              className={`${toggle ? "md:hidden" : "block"}`}
              icon={faCaretRight}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
