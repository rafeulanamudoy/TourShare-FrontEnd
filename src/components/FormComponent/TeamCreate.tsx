"use client";

import React, { useRef, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";

import { useFieldArray, useForm } from "react-hook-form";

import { UseDynamicLoading } from "@/src/utilities/UseDynamicLoading";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTeamSchema } from "@/src/lib/validation/yupValidation";
import { createTeam } from "@/src/lib/actions/Server/team";
import { showToast } from "@/src/utilities/ToastOptions";
import { ICreateTeam } from "@/src/types/ICreateTeam";
import Input from "@/src/hooks/reactHookForm/Input";
import Form from "@/src/hooks/reactHookForm/Form";
import { override1 } from "@/src/utilities/css";

interface TeamCreateProps {
  email: string;
  phoneNumber: string;
}

export default function TeamCreate({ email, phoneNumber }: TeamCreateProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const res = await createTeam(data);

      if (res?.success) {
        showToast("success", res?.message);

        setError("");
        reset();
      } else {
        const errorMessage = res?.message;

        res.errorCode === 11000
          ? setError(
              "you can't start a new journey while another is active. Please end your current journey or update its status to 'Closed'."
            )
          : setError(errorMessage);
      }
    } catch (error) {
      showToast("error", "an error occurred. please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      id="createTeam"
      className={`  py-5   flex  flex-col  justify-center items-center       bg-[#FF914F]`}
    >
      <span
        className={` mb-5   uppercase 2xl:text-[70px] xl:text-[50px]  lg:text-[40px]  md:text-[30px] sm:text-[20px] text-[15px] 2xl:h-[120px] xl:h-[110x] lg:h-[80px] md:h-[70px] sm:h-[60px] h-[40px] w-[80%]    text-[#2E4262] border-[#707070] border-2 bg-white   mx-auto  grid justify-center items-center  `}
      >
        Create Team
      </span>

      <Form
        className="  2xl:text-4xl xl:text-3xl  lg:text-2xl md:text-xl  sm:text-xs  text-[8px] capitalize   text-white grid 2xl:gap-y-16 xl:gap-y-14 lg:gap-y-12 md:gap-y-10 sm:gap-y-6 gap-y-4
         items-center    md:w-[75%]  w-[90%] "
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
            <span>Phone Number </span>
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
          <label className=" col-span-2 grid " htmlFor="address">
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
          <label className=" col-span-2 grid " htmlFor="nationalIdNumber">
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
              className="  block  2xl:mb-16 xl:mb-14 lg:mb-12 md:mb-10 sm:mb-6 mb-4 text-center    2xl:text-[70px] xl:text-[50px]  lg:text-[40px]  md:text-[30px] sm:text-[20px] text-[15px]   uppercase   text-[#2E4262]    "
              htmlFor="teamDetails"
            >
              Team Details
            </label>

            <div className="   grid  grid-cols-2   2xl:gap-16 xl:gap-14 lg:gap-12 md:gap-10 sm:gap-6 gap-4">
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

            <div className=" 2xl:mt-16 xl:mt-14 lg:mt-12 md:mt-10 sm:mt-6 mt-4 2xl:gap-y-16 xl:gap-y-14 lg:gap-y-12 md:gap-y-10 sm:gap-y-6 gap-y-4 grid">
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
                        placeholder="Responsibility"
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
