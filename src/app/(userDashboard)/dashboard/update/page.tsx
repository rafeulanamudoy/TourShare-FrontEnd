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
import { override } from "@/utilities/css";

export default function Update() {
  const [user, setUser] = useState<IUpdatedUser | null>();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const user = await getSingleUser();
      console.log(user, "check user data");
      if (user) {
        setUser(user?.data);
      }
    })();
  }, []);
  const onSubmit = async (userData: IUpdatedUser) => {
    const formData = new FormData();

    userData.name.firstName &&
      formData.append("name[firstName]", userData.name.firstName);
    userData.name.lastName &&
      formData.append("name[lastName]", userData.name.lastName);

    selectedFiles && formData.append("profileImage", selectedFiles[0]);

    userData.phoneNumber &&
      formData.append("phoneNumber", userData.phoneNumber);
    try {
      setLoading(true);
      if (user?._id && user?.role) {
        const res = await updateSingleUser(formData, user?._id, user?.role);
        if (res?.success) {
          console.log(res);
          toast.success(res.message);
        }
      }
    } catch (error) {
      console.log(error, "update user error");
      toast.error("An error occurred while updating  your profile");
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
              defaultValue={user?.name?.firstName}
              autoFocus
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
              defaultValue={user?.name?.lastName}
              register={register}
              autoFocus
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
              defaultValue={user?.email}
              readOnly
              register={register}
              autoFocus
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
              defaultValue={user?.phoneNumber}
              register={register}
              autoFocus
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
              ) : user?.profileImage?.url ? ( // Check if user profileImage url exists
                <Image
                  src={user.profileImage.url}
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
            className=" grid  lg:float-right items-center mt-5     bg-[#FF914F] w-1/2 h-[3em] rounded-md"
            type="submit"
          >
            {loading ? (
              <ClipLoader
                loading={loading}
                cssOverride={override}
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
