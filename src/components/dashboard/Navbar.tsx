"use client";

import { useRemoveAccount, useUserData } from "@/hooks/user/user";
import { getSingleUser } from "@/lib/actions/Server/user";
import { setToggle } from "@/redux/features/toggle/toggleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IUpdatedUser } from "@/types/IUser";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const handleLogOut = useRemoveAccount();

  const dispatch = useAppDispatch();
  const { profileImage } = useAppSelector((state) => state.auth.user);

  return (
    <div className=" bg-white 2xl:text-[25px]   xl:text-[15px]   lg:text-[12px]  text-[8px]  px-5 flex items-center justify-between     h-36  border-b-2 ">
      <div>
        <button onClick={() => dispatch(setToggle())}>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </button>
      </div>

      <div className="  flex  font-bold text-[#31363F] items-center gap-x-5 xl:gap-x-18   capitalize  ">
        <div>
          <Link href="/">home</Link>
        </div>

        <div>
          <button className="capitalize" onClick={handleLogOut}>
            logout
          </button>
        </div>
        <div className="  w-8 h-8  lg:w-10 lg:h-10   xl:w-12 xl:h-12 2xl:w-14 2xl:h-14  rounded-full overflow-hidden ">
          {profileImage && (
            <Image
              src={profileImage?.url}
              alt="Picture of the author"
              className="rounded-full"
              width={100}
              height={100}
            />
          )}
        </div>
      </div>
    </div>
  );
}
