"use client";

import Form from "@/hooks/reactHookForm/Form";
import Input from "@/hooks/reactHookForm/Input";

import { IUpdatedUser } from "@/types/IUser";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { override2 } from "@/utilities/css";

import { ICreateTeam } from "@/types/ICreateTeam";
import { updateSingleTeam } from "@/lib/actions/Server/team";
import { useRouter } from "next/navigation";
interface ITeamProps {
  team: ICreateTeam; // Define the type of the location prop
}
const formatDateString = (date: Date | string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};
export default function UpdateTeam({ team }: ITeamProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //console.log(team, "team info");

  const { register, handleSubmit } = useForm();

  const onSubmit = async (userValue: IUpdatedUser) => {
    try {
      setLoading(true);
      const res = await updateSingleTeam(team._id, userValue);
      if (res?.success) {
        router.push("/dashboard/team");
        toast.success(res?.message);
      } else {
        const errorMessage = res?.message || "Error message not available";
        toast.error(errorMessage);
      }
      // console.log(userValue);
    } catch (error) {
      toast.error("an error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className=" w-[90%] mx-auto grid "
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
    >
      <div className="2xl:text-3xl xl:text-2xl lg:text-base  md:text-xs sm:text-[10px] text-[8px]   gap-5 capitalize grid lg:grid-cols-2 w-full ">
        <div className="grid gap-y-5">
          <label className="" htmlFor="destination">
            Destination
          </label>
          <Input
            className="w-full text-white h-[4em]  p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
            name="destination"
            type="text"
            defaultValue={team?.destination}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="teamStatus">
            Status
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
            name="teamStatus"
            selectOptions={[
              { value: "ongoing", label: "Ongoing" },
              { value: "closed", label: "Closed" },
            ]}
            defaultValue={team?.teamStatus}
            register={register}
          />
        </div>

        <div className="grid gap-y-5">
          <label className="" htmlFor="currentMembers">
            Current Members
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
            name="currentMembers"
            type="number"
            defaultValue={team?.currentMembers}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="neededMembers">
            needed Members
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
            name="neededMembers"
            type="number"
            defaultValue={team?.neededMembers}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="startDate">
            start Date
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070] custom-date-picker"
            name="startDate"
            type="date"
            defaultValue={formatDateString(team?.startDate)}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="endDate">
            end Date
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]  custom-date-picker"
            name="endDate"
            type="date"
            defaultValue={formatDateString(team?.endDate)}
            register={register}
          />
        </div>
      </div>
      <div>
        <button
          className={`grid  lg:float-right items-center mt-5     bg-[#FF914F] w-1/2 ${
            loading
              ? "h-auto"
              : "h-[3em]  2xl:text-3xl xl:text-2xl lg:text-base  md:text-xs sm:text-[10px] text-[8px] "
          } rounded-md`}
          type="submit"
        >
          {loading ? (
            <ClipLoader
              loading={loading}
              cssOverride={override2}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </Form>
  );
}
