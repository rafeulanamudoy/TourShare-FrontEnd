import ToggoleUseButton from "@/src/components/Buttons/ToggoleUserButton";
import ProfileUpdate from "@/src/components/DashBoard/ProfileUpdate";

export default function page() {
  return (
    <div className="my-10 w-2/3 h-1/2 bg-white mx-auto py-5">
      <div className="  w-[90%] mx-auto  flex justify-between items-center   2xl:text-5xl xl:text-4xl lg:text-2xl md:text-xl  sm:text-lg text-base mb-5  capitalize">
        <span>Update information</span>
        <ToggoleUseButton location={"/dashboard/profile"} />
      </div>

      <ProfileUpdate />
    </div>
  );
}
