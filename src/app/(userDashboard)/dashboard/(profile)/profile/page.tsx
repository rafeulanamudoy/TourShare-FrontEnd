import UserToggoleButton from "@/src/components/Buttons/UserToggoleButton";
import { getSingleUser } from "@/src/lib/actions/Server/user";
import Image from "next/image";

export default async function page() {
  const {
    data: { email, name, phoneNumber, profileImage },
  } = await getSingleUser();
  return (
    <div className=" my-10  h-1/2    capitalize   bg-white   md:w-2/3  w-[90%] mx-auto py-5   ">
      <div className="  w-[90%]   mx-auto  flex justify-between items-center   2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl  sm:text-lg text-base  mb-5">
        <span>personal information</span>
        <UserToggoleButton location={"profile/update"} />
      </div>
      <div className="   w-[90%] mx-auto    ">
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
      <div className=" relative grid w-[90%] mx-auto  gap-y-10 2xl:text-2xl xl:text-xl lg:text-base  md:text-xs text-[9px] grid-cols-2  ">
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
