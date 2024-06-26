import { getSingleUser } from "@/lib/actions/Server/user";

import Image from "next/image";
import UserToggoleButton from "../buttons/UserToggoleButton";

export default async function page() {
  const {
    data: { email, name, phoneNumber, profileImage },
  } = await getSingleUser();

  return (
    <>
      <div className="  w-[90%] mx-auto  flex justify-between items-center   2xl:text-5xl xl:text-4xl lg:text-2xl md:text-xl  sm:text-lg text-base  mb-5">
        <span>personal information</span>
        <UserToggoleButton location={"profile/update"} />
      </div>
      <div className=" w-[90%]  mx-auto    ">
        <div className=" 2xl:h-80 2xl:w-80 xl:h-64 xl:w-64 lg:h-52 lg:w-52 md:h-44 md:w-44  sm:w-32 sm:h-32 w-28 h-28  w overflow-hidden">
          <Image
            className="block"
            src={profileImage?.url}
            priority={true}
            alt="profile Image"
            width={300}
            height={300}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className=" relative grid w-[90%]  mx-auto  gap-y-10 2xl:text-3xl xl:text-2xl lg:text-base  md:text-xs sm:text-[10px] text-[8px] grid-cols-2  ">
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
    </>
  );
}
