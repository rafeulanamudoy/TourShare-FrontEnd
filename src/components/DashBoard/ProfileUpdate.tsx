"use client";

import Form from "@/hooks/reactHookForm/Form";
import Input from "@/hooks/reactHookForm/Input";
import { updateSingleUser } from "@/lib/actions/Server/user";
import Image from "next/image";

import { IUpdatedUser } from "@/types/IUser";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { ClipLoader } from "react-spinners";
import { override2 } from "@/utilities/css";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/user/user";
import { UseDynamicLoading } from "@/utilities/UseDynamicLoading";
import { showToast } from "@/utilities/ToastOptions";

export default function ProfileUpdate() {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, userData } = useUserData();

  const { register, handleSubmit } = useForm();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);
  const onSubmit = async (userValue: IUpdatedUser) => {
    const formData = new FormData();

    if (
      userData &&
      userValue.name.firstName.length > 0 &&
      !userValue.name.lastName
    ) {
      formData.append("name[firstName]", userValue.name.firstName);
      formData.append("name[lastName]", userData.name.lastName);
    }
    if (
      userData &&
      userValue.name.lastName.length > 0 &&
      !userValue.name.firstName
    ) {
      formData.append("name[lastName]", userValue.name.lastName);
      formData.append("name[firstName]", userData.name.firstName);
    }
    if (
      userValue.name.firstName.length > 0 &&
      userValue.name.lastName.length > 0
    ) {
      formData.append("name[firstName]", userValue.name.firstName);
      formData.append("name[lastName]", userValue.name.lastName);
    }
    // Append last name if it's updated

    // Append profile image if selected
    if (selectedFiles && selectedFiles.length > 0) {
      formData.append("profileImage", selectedFiles[0]);
    }

    // Append phone number if it's updated
    if (userValue.phoneNumber.length > 0) {
      formData.append("phoneNumber", userValue.phoneNumber);
    }

    try {
      setLoading(true);
      if (userData?._id && userData?.role) {
        const res = await updateSingleUser(
          formData,
          userData?._id,
          userData?.role
        );
        if (res?.success) {
          router.push("/dashboard/profile");
          showToast("success", res.message);

          dispatch(
            setUser({
              user: {
                email: res.data.email,
                role: res.data.role,
                profileImage: res?.data?.profileImage,
                name: res?.data?.name,
                phoneNumber: res?.data?.phoneNumber,
                _id: res?.data?._id,
                emailVerified: res?.data?.emailVerified,
              },
            })
          );
        } else {
          showToast("error", res.message);
        }
      }
    } catch (error) {
      showToast("error", "an error occurred. please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };
  if (isLoading) {
    return null;
  }
  return (
    <Form
      className=" w-[90%] mx-auto grid "
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
    >
      <div className="2xl:text-3xl xl:text-2xl lg:text-base  md:text-xs sm:text-[10px] text-[8px]   gap-5 capitalize grid lg:grid-cols-2 w-full ">
        <div className="grid gap-y-5">
          <label className="" htmlFor="firstName">
            First Name
          </label>{" "}
          <Input
            className="w-full text-white h-[4em] p-5 rounded-md bg-[#31363F] placeholder:text-white border-2 border-[#707070]"
            name="name.firstName"
            type="text"
            register={register}
            defaultValue={userData?.name?.firstName}
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
            defaultValue={userData?.name?.lastName}
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
            defaultValue={userData?.email}
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
            defaultValue={userData?.phoneNumber}
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
            ) : userData?.profileImage?.url ? ( // Check if user profileImage url exists
              <Image
                src={userData?.profileImage?.url}
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
          ref={buttonRef}
          className={`grid  lg:float-right items-center mt-5     bg-[#FF914F] w-1/2 ${
            loading
              ? "h-auto"
              : "h-[3em] 2xl:text-3xl xl:text-2xl lg:text-base  md:text-xs sm:text-[10px] text-[8px]"
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
