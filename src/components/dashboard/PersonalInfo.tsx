import { getSingleUser } from "@/lib/actions/Server/user";
import UserUpdateButton from "../buttons/UserToggole";
import Image from "next/image";

export default async function PersonalInfo() {
  const data = await getSingleUser();
  const { email, name, phoneNumber, profileImage } = data.data;
  return (
    <>
      <div className="  w-[90%] mx-auto  flex justify-between items-center   2xl:text-5xl xl:text-4xl lg:text-2xl  text-xl mb-5">
        <span>personal information</span>
        <UserUpdateButton location={"/update"} />
      </div>
      <div className=" w-[90%]  mx-auto    ">
        <div className=" 2xl:h-80 2xl:w-80 xl:h-64 xl:w-64 lg:h-52 lg:w-52 md:h-44 md:w-44  w-32 h-32  w overflow-hidden">
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
    </>
  );
}
