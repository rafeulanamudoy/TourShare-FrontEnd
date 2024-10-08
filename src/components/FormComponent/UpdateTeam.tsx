"use client";

import { ENUM_NOTIFICATION_TYPE } from "@/src/enums/notification";
import Form from "@/src/hooks/reactHookForm/Form";
import Input from "@/src/hooks/reactHookForm/Input";
import {
  getSingleTeamByEmail,
  updateSingleTeam,
} from "@/src/lib/actions/Server/team";
import { useSocketContext } from "@/src/socket/context/SocketContext";
import { ICreateTeam } from "@/src/types/ICreateTeam";
import { IJoinTeam } from "@/src/types/IJoinTeam";
import { IUpdatedUser } from "@/src/types/IUser";
import { override2 } from "@/src/utilities/css";
import { showToast } from "@/src/utilities/ToastOptions";
import { UseDynamicLoading } from "@/src/utilities/UseDynamicLoading";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

interface ITeamProps {
  team: ICreateTeam;
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      teamDetails: {
        activities: team?.teamDetails?.activities || [],
        responsibilities: team?.teamDetails?.responsibilities || [],
        depurture: team?.teamDetails?.depurture || "",
        depurtureTime: team?.teamDetails?.depurtureTime || "",
        returnTime: team?.teamDetails?.returnTime || "",
        accommodations: team?.teamDetails?.accommodations || "",
        transportation: team?.teamDetails?.transportation || "",
        description: team?.teamDetails?.description || "",
        costBreakdown: team?.teamDetails?.costBreakDown || "",
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
        createTeam.data.joinPeople.map((people: { joinTeamId: IJoinTeam }) =>
          joinPeopleEmail.push(people?.joinTeamId?.email)
        );
      }

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
        showToast("success", res?.message);
      } else {
        showToast("error", res.message);
      }
    } catch (error) {
      showToast("error", "Something Went Wrong.Please Try Again!");
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
          <label className="" htmlFor="depurture">
            Depurture
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]  custom-date-picker"
            name="teamDetails.depurture"
            type="text"
            defaultValue={team?.teamDetails?.depurture}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="depurtureTime">
            Depurture Time
          </label>

          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]  custom-date-picker"
            name="teamDetails.depurtureTime"
            type="text"
            defaultValue={team?.teamDetails?.depurtureTime}
            register={register}
          />
        </div>
        <div className="grid gap-y-5">
          <label className="" htmlFor="returnTime">
            Return Time
          </label>
          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070] custom-date-picker"
            name="teamDetails.returnTime"
            type="text" // Set input type to time
            defaultValue={team?.teamDetails?.returnTime}
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
            name="teamDetails.costBreakDown"
            type="text"
            defaultValue={team?.teamDetails?.costBreakDown}
            register={register}
          />
        </div>
      </div>

      <div>
        <button
          ref={buttonRef}
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
              size={loaderSize}
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
