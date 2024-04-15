"use client";

import { useRemoveAccount, useUserData } from "@/hooks/user/user";
import { setToggle } from "@/redux/features/toggle/toggleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const isLoading = useUserData();
  const handleLogOut = useRemoveAccount();

  const dispatch = useAppDispatch();
  const { profileImage, name } = useAppSelector((state) => state.auth.user);

  // const { toggle } = useAppSelector((state) => state.toggle);
  // console.log(toggle, "check state");
  //console.log(name);

  if (isLoading) {
    return null;
  }
  return (
    <div className="  2xl:text-[25px]  xl:text-[15px]   lg:text-[12px]  text-[8px]  px-5 flex items-center justify-between     h-36  border-b-2 ">
      <div>
        <button onClick={() => dispatch(setToggle())}>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </button>
      </div>

      <div className=" flex  font-bold text-[#31363F] items-center gap-x-5   capitalize">
        <div>
          <Link href="/">Home</Link>
        </div>
        <div className="  w-8 h-8  lg:w-10 lg:h-10   xl:w-12 xl:h-12 2xl:w-14 2xl:h-14  rounded-full overflow-hidden ">
          <Image
            src={profileImage.url}
            alt="Picture of the author"
            className="rounded-full"
            width={100}
            height={100}
          />
        </div>
        <div>
          <p>{name.firstName.concat(" ", name.lastName)}</p>
        </div>
        <div>
          <button onClick={handleLogOut}> logout</button>
        </div>
      </div>
    </div>
  );
}
