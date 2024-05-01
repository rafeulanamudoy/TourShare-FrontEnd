"use client";

import Form from "@/hooks/reactHookForm/Form";
import Input from "@/hooks/reactHookForm/Input";
import { getSingleUser, updateSingleUser } from "@/lib/actions/Server/user";
import Image from "next/image";

import { IUpdatedUser, IUserSchema } from "@/types/IUser";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { override2 } from "@/utilities/css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

export default function Update() {
  const [userValue, setUserValue] = useState<IUpdatedUser | null>();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const user = await getSingleUser();
      // console.log(user, "check user data");
      if (user) {
        setUserValue(user?.data);
      }
    })();
  }, []);
  const onSubmit = async (userData: IUpdatedUser) => {
    const formData = new FormData();
    console.log(userData, "check data");
    if (
      userValue &&
      userData.name.firstName.length > 0 &&
      !userData.name.lastName
    ) {
      console.log(userValue?.name.lastName, "lastName check");
      formData.append("name[firstName]", userData.name.firstName);
      formData.append("name[lastName]", userValue.name.lastName);
    }
    if (
      userValue &&
      userData.name.lastName.length > 0 &&
      !userData.name.firstName
    ) {
      console.log(userValue?.name.firstName, "firstName check");
      formData.append("name[lastName]", userData.name.lastName);
      formData.append("name[firstName]", userValue.name.firstName);
    }
    if (
      userData.name.firstName.length > 0 &&
      userData.name.lastName.length > 0
    ) {
      console.log(userValue?.name.firstName, "firstName check");
      formData.append("name[firstName]", userData.name.firstName);
      formData.append("name[lastName]", userData.name.lastName);
    }
    // Append last name if it's updated

    // Append profile image if selected
    if (selectedFiles && selectedFiles.length > 0) {
      formData.append("profileImage", selectedFiles[0]);
    }

    // Append phone number if it's updated
    if (userData.phoneNumber.length > 0) {
      formData.append("phoneNumber", userData.phoneNumber);
    }

    try {
      setLoading(true);
      if (userValue?._id && userValue?.role) {
        const res = await updateSingleUser(
          formData,
          userValue?._id,
          userValue?.role
        );
        if (res?.success) {
          // console.log(res);
          toast.success(res.message);
          dispatch(
            setUser({
              user: {
                email: res.email,
                role: res.role,
                profileImage: res?.data?.profileImage,
                name: res?.data?.name,
                phoneNumber: res?.data?.phoneNumber,
                _id: res?.data?._id,
              },
            })
          );
        }
      }
    } catch (error) {
      console.log(error, "update page user error");
      toast.error("An error occurred while updating your profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
    // const file = event.target.files?.[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImagePreview(reader.result as string);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  return (
    <div className="my-10 w-2/3 h-1/2 bg-white mx-auto py-5">
      <Form
        className=" w-[90%] mx-auto grid "
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className="2xl:text-3xl xl:text:2xl lg:text-lg text-sm gap-5 capitalize grid lg:grid-cols-2 w-full ">
          <div className="grid gap-y-5">
            <label className="" htmlFor="firstName">
              First Name
            </label>{" "}
            <Input
              className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
              name="name.firstName"
              type="text"
              register={register}
              defaultValue={userValue?.name?.firstName}
            />
          </div>

          <div className="grid gap-y-5">
            <label className="" htmlFor="lastName">
              Last Name
            </label>
            <Input
              className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
              name="name.lastName"
              type="text"
              defaultValue={userValue?.name?.lastName}
              register={register}
            />
          </div>

          <div className="grid gap-y-5">
            <label className="" htmlFor="email">
              Email
            </label>
            <Input
              className="w-full text-white h-[4em] hover:cursor-not-allowed p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
              name="email"
              type="email"
              defaultValue={userValue?.email}
              readOnly
              register={register}
            />
          </div>

          <div className="grid gap-y-5">
            <label className="" htmlFor="phoneNumber">
              Phone Number
            </label>

            <Input
              className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
              name="phoneNumber"
              type="phoneNumber"
              defaultValue={userValue?.phoneNumber}
              register={register}
            />
          </div>

          <div className="grid gap-y-5">
            <label className="" htmlFor="profileImage">
              Profile Image
            </label>
            <div>
              <label className="text-2xl flex gap-3 items-center  cursor-pointer">
                <FontAwesomeIcon icon={faFileArrowUp} />
                <span>Upload</span>
                <Input
                  style={{
                    visibility: "hidden",
                  }}
                  type="file"
                  register={register}
                  name="profileImage"
                  className="w-1/2 xl:w-full"
                  autoFocus
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="2xl:h-80 2xl:w-80 xl:h-64 xl:w-64 lg:h-52 lg:w-52 md:h-44 md:w-44 w-32 h-32 overflow-hidden">
              {selectedFiles ? ( // Check if imagePreview is not null
                <Image
                  src={URL.createObjectURL(selectedFiles[0])}
                  alt="profile Image"
                  width={300}
                  height={300}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              ) : userValue?.profileImage?.url ? ( // Check if user profileImage url exists
                <Image
                  src={userValue?.profileImage?.url}
                  alt="profile Image"
                  width={300}
                  height={300}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              ) : (
                <span>No profile image available</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            className={`grid  lg:float-right items-center mt-5     bg-[#FF914F] w-1/2 ${
              loading ? "h-auto" : "h-[3em]"
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
    </div>
  );
}
