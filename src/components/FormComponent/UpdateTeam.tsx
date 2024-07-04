"use client";

import Form from "@/hooks/reactHookForm/Form";
import Input from "@/hooks/reactHookForm/Input";

import { IUpdatedUser } from "@/types/IUser";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { override2 } from "@/utilities/css";

import { ICreateTeam } from "@/types/ICreateTeam";
import {
  getSingleTeamByEmail,
  getSingleTeamById,
  updateSingleTeam,
} from "@/lib/actions/Server/team";
import { useRouter } from "next/navigation";
import { useSocketContext } from "@/socket/context/SocketContext";
import { useAppSelector } from "@/redux/hooks";
import { IJoinTeam } from "@/types/IJoinTeam";
import { ENUM_NOTIFICATION_TYPE } from "@/enums/notification";
interface ITeamProps {
  team: ICreateTeam; // Define the type of the location prop
}
const formatDateString = (date: Date | string | undefined | null) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

export default function UpdateTeam({ team }: ITeamProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { sendUpdateCreateTeamNotify } = useSocketContext();
  //console.log(team, "team info");

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      teamDetails: {
        activities: team?.teamDetails?.activities || [],
        responsibilities: team?.teamDetails?.responsibilities || [],
        meetingPoint: team?.teamDetails?.meetingPoint || "",
        meetingDate: team?.teamDetails?.meetingDate || "",
        meetingTime: team?.teamDetails?.meetingTime || "",
        accommodations: team?.teamDetails?.accommodations || "",
        transportation: team?.teamDetails?.transportation || "",
        description: team?.teamDetails?.description || "",
        costBreakdown: team?.teamDetails?.costBreakdown || "",
      },
      teamName: team?.teamName || "",
      destination: team?.destination || "",
      budget: team?.budget || "",
      teamStatus: team?.teamStatus || "",
      currentMembers: team?.currentMembers || 0,
      neededMembers: team?.neededMembers || 0,
      startDate: formatDateString(team?.startDate),
      endDate: formatDateString(team?.endDate),
    },
  });
  const {
    fields: activityFields,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: "teamDetails.activities",
  });
  const {
    fields: responsibilityFields,
    append: appendResponsibilities,
    remove: removeResponsibilities,
  } = useFieldArray({
    control,
    name: "teamDetails.responsibilities",
  });
  const onSubmit = async (userValue: IUpdatedUser) => {
    try {
      setLoading(true);
      let joinPeopleEmail: any[] = [];
      const res = await updateSingleTeam(team?._id, userValue);
      const createTeam = await getSingleTeamByEmail(team?.email);
      if (createTeam?.data?.joinPeople?.length > 0) {
        // console.log(createTeam, "create team");
        createTeam.data.joinPeople.map((people: { joinTeamId: IJoinTeam }) =>
          joinPeopleEmail.push(people?.joinTeamId?.email)
        );
      }
      // console.log(joinPeopleEmail, joinPeopleEmail);
      if (res?.success) {
        const timestamp = new Date().toISOString();
        joinPeopleEmail.length > 0 &&
          sendUpdateCreateTeamNotify(
            joinPeopleEmail,
            `${team.teamName} has updated some info about his team`,
            ENUM_NOTIFICATION_TYPE.UPDATECREATETEAM,
            timestamp
          );
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
          <label className="" htmlFor="groupName">
            Group Name
          </label>
          <Input
            className="w-full text-white h-[4em]  p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
            name="teamName"
            type="text"
            defaultValue={team?.teamName}
            register={register}
          />
        </div>
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
          <label className="" htmlFor="budget">
            Budget
          </label>
          <Input
            className="w-full text-white h-[4em]  p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
            name="budget"
            type="text"
            defaultValue={team?.budget}
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

        <div className="grid gap-y-5">
          <label className="" htmlFor="meetingPoint">
            Meeting Point
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]  custom-date-picker"
            name="teamDetails.meetingPoint"
            type="text"
            defaultValue={team?.teamDetails?.meetingPoint}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="meetingDate">
            Meeting Date
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]  custom-date-picker"
            name="teamDetails.meetingDate"
            type="date"
            defaultValue={formatDateString(team?.teamDetails?.meetingDate)}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="meetingTime">
            Meeting Time
          </label>
          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070] custom-date-picker"
            name="teamDetails.meetingTime"
            type="time" // Set input type to time
            defaultValue={team?.teamDetails?.meetingTime}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="accomodations">
            Accomodations
          </label>
          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070] custom-date-picker"
            name="teamDetails.accommodations"
            type="text"
            defaultValue={team?.teamDetails?.accommodations}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="transportation">
            Transportation
          </label>
          <Input
            selectOptions={[
              { value: "bus", label: "Bus" },
              { value: "train", label: "Train" },
              { value: "airplane", label: "Airplane" },
            ]}
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070] custom-date-picker"
            name="teamDetails.transportation"
            defaultValue={team?.teamDetails?.transportation}
            register={register}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-y-5 2xl:text-3xl xl:text-2xl lg:text-base  md:text-xs sm:text-[10px] text-[8px]">
        <div className="grid gap-y-5">
          <label className="" htmlFor="endDate">
            Activities
          </label>
          <div className="grid gap-5">
            {activityFields.map((field, index) => (
              <div key={field.id} className="flex gap-5">
                <Input
                  className=" text-[#707070] w-full h-[3em] bg-white p-5 border-2 border-[#707070]"
                  name={`teamDetails.activities.[${index}].activity`}
                  type="text"
                  placeholder="Activity"
                  defaultValue={field.activity}
                  register={register}
                  autoFocus
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700  text-white   py-2 px-4 rounded"
                  onClick={() => removeActivity(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-[#31363F]  hover:bg-[#1c1f24] text-white  py-2 px-4 rounded "
              onClick={() => appendActivity({ activity: "" })}
            >
              Add Activity
            </button>
          </div>
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="endDate">
            Responsibilities
          </label>
          <div className="grid gap-5">
            {responsibilityFields.map((field, index) => (
              <div key={field.id} className="flex gap-5">
                <Input
                  className=" text-[#707070] w-full h-[3em] bg-white p-5 border-2 border-[#707070]"
                  name={`teamDetails.responsibilities.[${index}].responsibility`}
                  type="text"
                  placeholder="Responsibilities"
                  defaultValue={field.responsibility}
                  register={register}
                  autoFocus
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700  text-white   py-2 px-4 rounded"
                  onClick={() => removeResponsibilities(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-[#31363F]  hover:bg-[#1c1f24] text-white  py-2 px-4 rounded "
              onClick={() => appendResponsibilities({ responsibility: "" })}
            >
              Add Responsibility
            </button>
          </div>
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="endDate">
            Team Description
          </label>

          <Input
            textarea={true}
            className="w-full text-white p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]  custom-date-picker"
            name="teamDetails.description"
            type="text"
            defaultValue={team?.teamDetails?.description}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="endDate">
            Cost Breakdown
          </label>

          <Input
            textarea={true}
            className="w-full text-white p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]  custom-date-picker"
            name="teamDetails.costBreakdown"
            type="text"
            defaultValue={team?.teamDetails?.costBreakdown}
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
