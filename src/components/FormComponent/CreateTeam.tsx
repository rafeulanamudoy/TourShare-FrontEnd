"use client";

import React, { useRef, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";

import Input from "@/hooks/reactHookForm/Input";
import Form from "@/hooks/reactHookForm/Form";
import { useFieldArray, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import toast from "react-hot-toast";
import { CreateTeamSchema } from "@/lib/validation/yupValidation";
import { override1 } from "@/utilities/css";

import { useAppSelector } from "@/redux/hooks";
import { createTeam } from "@/lib/actions/Server/team";
import { ICreateTeam } from "@/types/ICreateTeam";

import { UseDynamicLoading } from "@/utilities/UseDynamicLoading";

export default function CreateTeam() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { email, phoneNumber } = useAppSelector((state) => state.auth.user);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreateTeamSchema) });
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
  const onSubmit = async (data: ICreateTeam) => {
    try {
      setLoading(true);
      console.log(data, "check data");

      const res = await createTeam(data);
      console.log(res, "check response");
      if (res?.success) {
        toast.success(res?.message);
        setError("");
        reset();
      } else {
        const errorMessage = res?.message;

        res.errorCode === 11000
          ? setError(
              "You can't start a new journey while another is active. Please end your current journey or update its status to 'Closed'."
            )
          : setError(errorMessage);
      }
    } catch (error) {
      //  console.log(error, "from create team");
      toast.error("please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      id="createTeam"
      className={` flex  flex-col  justify-center items-center  py-16   gap-y-16  h-auto  bg-[#FF914F]`}
    >
      <span
        className={` uppercase 2xl:text-[100px] xl:text-[70px]  lg:text-[50px]  md:text-[30px] text-[20px] w-[75%]   text-[#2E4262] border-[#707070] border-2 bg-white 2xl:h-[160px] xl:h-[150x] lg:h-[135px] h-[120px]  mx-auto  grid justify-center items-center `}
      >
        Create Team
      </span>

      <Form
        className="  2xl:text-5xl xl:text-3xl  lg:text-2xl md:text-xl  sm:text-xs  text-[8px] capitalizecapitalize   text-white grid gap-y-16
         items-center    md:w-[70%]   "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="destination">
            team name
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]  bg-white px-5  py-5   border-2   border-[#707070] "
              name="teamName"
              type="text"
              placeholder="teamName"
              error={errors?.teamName?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="destination">
            Destination
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]  bg-white px-5  py-5   border-2   border-[#707070] "
              name="destination"
              type="text"
              placeholder="destination"
              error={errors?.destination?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="email">
            Email
          </label>
          <div className="     col-span-10  ">
            <Input
              className=" hover:cursor-not-allowed text-[#707070] w-full  h-[3em]  bg-white px-5  py-5   border-2   border-[#707070] "
              name="email"
              type="email"
              placeholder="abcd@gmail.com"
              defaultValue={email}
              readOnly
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="    grid     grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="phoneNumber">
            <span>Phone </span>
            <span>Number</span>
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070]  w-full   h-[3em]  bg-white p-5   hover:cursor-not-allowed    border-2 border-[#707070] "
              name="phoneNumber"
              type="tel"
              defaultValue={phoneNumber}
              register={register}
              readOnly
              autoFocus
            />
          </div>
        </div>
        <div className="    grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="currentMembers">
            Current Members
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]    bg-white  p-5   border-2    border-[#707070] "
              name="currentMembers"
              type="number"
              register={register}
              placeholder="current members"
              error={errors?.currentMembers?.message}
              autoFocus
            />
          </div>
        </div>
        <div className="  grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="neededMembers">
            needed Members
          </label>
          <div className="     col-span-10  ">
            <Input
              className=" text-[#707070]
              w-full  h-[3em]  bg-white p-5    border-2 border-[#707070] "
              name="neededMembers"
              type="number"
              placeholder="needed members"
              error={errors?.neededMembers?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className=" w-full   grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2" htmlFor="destination">
            Budget
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]  bg-white px-5  py-5   border-2   border-[#707070] "
              name="budget"
              type="number"
              placeholder="budget in taka"
              error={errors?.budget?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="      grid       grid-cols-12   justify-center items-center ">
          <label className=" col-span-2 " htmlFor="Date">
            Start And End Date
          </label>

          <div className=" col-span-10     flex gap-x-5   ">
            <Input
              className=" w-full    text-[#707070] h-[3em] bg-white p-5   border-2 border-[#707070]  "
              name="startDate"
              type="date"
              error={errors?.startDate?.message}
              register={register}
              autoFocus
            />
            <span className="my-auto">To</span>
            <Input
              className="text-[#707070]  w-full  h-[3em] bg-white  p-5    border-2 border-[#707070]  "
              name="endDate"
              type="date"
              error={errors?.endDate?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>{" "}
        <div className="    grid    grid-cols-12  justify-center items-center   ">
          <label className=" col-span-2 grid gap-y-3" htmlFor="address">
            Address
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]  bg-white p-5    border-2  mx-auto block border-[#707070] "
              name="address"
              type="text"
              placeholder="Address"
              error={errors?.address?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="  grid    grid-cols-12  justify-center items-center   ">
          <label
            className=" col-span-2 grid gap-y-3"
            htmlFor="nationalIdNumber"
          >
            <span>NationalId </span>
            <span>Number</span>
          </label>
          <div className="     col-span-10  ">
            <Input
              className="text-[#707070] w-full  h-[3em]  bg-white p-5    border-2  mx-auto block border-[#707070] "
              name="nationalIdNumber"
              type="text"
              placeholder="national id number"
              error={errors?.nationalIdNumber?.message}
              register={register}
              autoFocus
            />
          </div>
        </div>
        <div className="    grid  grid-cols-12  ">
          <div className="col-span-2"></div>
          <div className="col-span-10 ">
            <label
              className="  block  mb-16 text-center   2xl:text-[100px] xl:text-[70px]  lg:text-[50px]  md:text-[30px] text-[20px]  uppercase   text-[#2E4262]    "
              htmlFor="teamDetails"
            >
              Team Details
            </label>

            <div className="   grid  grid-cols-2   gap-16 ">
              <div className="grid gap-y-5">
                <label className="   " htmlFor="depurture">
                  Depurture
                </label>

                <Input
                  className="text-[#707070]  w-full  h-[3em] bg-white  p-5    border-2 border-[#707070]  "
                  name="teamDetails.depurture"
                  placeholder=" Where You Depurture From"
                  type="text"
                  error={errors?.teamDetails?.depurture?.message}
                  register={register}
                  autoFocus
                />
              </div>
              <div className="grid gap-y-5">
                <label className="   " htmlFor="depurtureTime">
                  Depurture Time
                </label>

                <Input
                  className="text-[#707070]  w-full  h-[3em] bg-white  p-5    border-2 border-[#707070]  "
                  name="teamDetails.depurtureTime"
                  placeholder=" Depurture Time"
                  type="text"
                  error={errors?.teamDetails?.depurtureTime?.message}
                  register={register}
                  autoFocus
                />
              </div>
              <div className="grid gap-y-5">
                <label className="   " htmlFor="returnTime">
                  Return Time
                </label>

                <Input
                  className="text-[#707070]  w-full  h-[3em] bg-white  p-5    border-2 border-[#707070]  "
                  name="teamDetails.returnTime"
                  placeholder="Return Time"
                  type="text"
                  error={errors?.teamDetails?.returnTime?.message}
                  register={register}
                  autoFocus
                />
              </div>

              <div className="grid gap-y-5">
                <label className="   " htmlFor="meetingTime">
                  Transportation
                </label>

                <Input
                  selectOptions={[
                    { value: "bus", label: "Bus" },
                    { value: "train", label: "Train" },
                    { value: "airplane", label: "Airplane" },
                  ]}
                  className="text-[#707070]  w-full  h-[3em] bg-white  p-5    border-2 border-[#707070]  "
                  name="teamDetails.transportation"
                  placeholder=" Transportation"
                  type="text"
                  error={errors?.teamDetails?.transportation?.message}
                  register={register}
                  autoFocus
                />
              </div>
            </div>

            <div className="mt-16 gap-y-16 grid">
              <div className="grid  gap-y-5">
                <label className="   " htmlFor="description">
                  Team Description
                </label>
                <Input
                  textarea={true}
                  className=" w-full    text-[#707070]  bg-white p-5   border-2 border-[#707070]  "
                  name="teamDetails.description"
                  type="text"
                  placeholder="team Description"
                  error={errors?.teamDetails?.description?.message}
                  register={register}
                  autoFocus
                />
              </div>
              <div className="grid gap-y-5">
                <label className="   " htmlFor="meetingTime">
                  Accommodations
                </label>

                <Input
                  textarea={true}
                  className="text-[#707070]  w-full   bg-white  p-5    border-2 border-[#707070]  "
                  name="teamDetails.accommodations"
                  placeholder="Describe the type of accommodation planned for the journey (e.g., hotel, AirBnB, hostel, camping)."
                  type="text "
                  error={errors?.teamDetails?.accommodations?.message}
                  register={register}
                  autoFocus
                />
              </div>
              <div className="grid gap-y-5">
                <label className="   " htmlFor="costBreakDown">
                  Cost Breakdown
                </label>

                <Input
                  className="text-[#707070]  w-full   bg-white  p-5    border-2 border-[#707070]  "
                  name="teamDetails.costBreakDown"
                  textarea={true}
                  placeholder="Provide details about how costs are needed for this journey (e.g., transportation, accommodation, food, activities). "
                  type="string"
                  error={errors?.teamDetails?.costBreakDown?.message}
                  register={register}
                  autoFocus
                />
              </div>
              <div className="grid gap-y-5">
                <label className=" ">Activities</label>
                <div className="  grid gap-y-5">
                  {activityFields.map((field, index) => (
                    <div key={field.id} className="flex gap-x-5">
                      <Input
                        className=" text-[#707070] w-full h-[3em] bg-white p-5 border-2 border-[#707070]"
                        name={`teamDetails.activities.[${index}].activity`}
                        type="text"
                        placeholder="Activity"
                        error={errors.teamDetails?.activities?.[index]?.message}
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
                    className="bg-[#31363F] hover:bg-[#1c1f24] text-white  py-2 px-4 rounded "
                    onClick={() => appendActivity({ activity: "" })}
                  >
                    Add Activity
                  </button>
                </div>
              </div>
              <div className="grid gap-y-5">
                <label className=" ">Responsibilities</label>
                <div className="  grid gap-y-5">
                  {responsibilityFields.map((field, index) => (
                    <div key={field.id} className="flex gap-x-5">
                      <Input
                        className=" text-[#707070] w-full h-[3em] bg-white p-5 border-2 border-[#707070]"
                        name={`teamDetails.responsibilities.[${index}].responsibility`}
                        type="text"
                        placeholder="Activity"
                        error={errors.teamDetails?.responsibilities?.message}
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
                    className="bg-[#31363F] hover:bg-[#1c1f24] text-white  py-2 px-4 rounded "
                    onClick={() =>
                      appendResponsibilities({ responsibility: "" })
                    }
                  >
                    Add Responsibility
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <button
          ref={buttonRef}
          className="submit-button mx-auto w-1/2 h-[3em] hover:bg-[#18253a]"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader
              loading={loading}
              cssOverride={override1}
              size={loaderSize}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Create Team"
          )}
        </button>
      </Form>
      {error && (
        <span className="  text-white 2xl:text-3xl xl:text-2xl  lg:text-xl md:text-lg  capitalize sm:text-xs  text-[8px] ">
          {error}
        </span>
      )}
    </div>
  );
}
