import SkeletonLoading from "@/components/Loader/SkeletionLoading";
import UserUpdateButton from "@/components/buttons/UserToggole";
import PersonalInfo from "@/components/dashboard/PersonalInfo";

export default function Profile() {
  return (
    <div className=" my-10  h-1/2   capitalize   bg-white   w-2/3 mx-auto py-5   ">
      <PersonalInfo />
    </div>
  );
}
