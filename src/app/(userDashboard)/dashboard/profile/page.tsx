import UserUpdateButton from "@/components/buttons/UserUpdateButton";
import { getSingleUser } from "@/lib/actions/Server/user";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default async function Profile() {
  const data = await getSingleUser();

  const { email, name, phoneNumber, profileImage } = data.data;

  return (
    <div className=" my-10  h-1/2  grid gap-y-5 capitalize   bg-white   w-2/3 mx-auto py-5   ">
      <div className="  w-[90%] mx-auto  flex justify-between items-center   2xl:text-5xl xl:text-4xl lg:text-2xl  text-xl mb-5">
        <span>personal information</span>
        <UserUpdateButton />
      </div>

      <div className="   w-[90%] mx-auto  relative ">
        <div className=" 2xl:h-80 2xl:w-80 xl:h-64 xl:w-64 lg:h-52 lg:w-52 md:h-44 md:w-44  w-32 h-32  w overflow-hidden">
          <Image
            className="block"
            src={profileImage?.url}
            priority={true}
            alt="profile Image"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className=" relative grid w-[90%]  mx-auto  gap-y-10  2xl:text-[25px]   xl:text-[15px]   lg:text-[12px]  text-[8px] grid-cols-2  ">
        <div className=" grid gap-y-3 ">
          <span>full name</span>
          <span>
            {" "}
            {name.firstName} {name.lastName}
          </span>
        </div>
        <div className=" grid  gap-y-3   ">
          <span>email</span>
          <span>{email}</span>
        </div>
        <div className="  grid  gap-y-3  ">
          <span>mobile number</span>
          <span>{phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}
