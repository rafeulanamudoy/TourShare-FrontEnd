"use client";

import Form from "@/src/hooks/reactHookForm/Form";
import Input from "@/src/hooks/reactHookForm/Input";
import { createContact } from "@/src/lib/actions/Server/contact";
import { ContactSchema } from "@/src/lib/validation/yupValidation";
import { useAppSelector } from "@/src/redux/hooks";
import { IContactData } from "@/src/types/IContact";
import { dancing_script, override1 } from "@/src/utilities/css";
import { showToast } from "@/src/utilities/ToastOptions";
import { UseDynamicLoading } from "@/src/utilities/UseDynamicLoading";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loaderSize = UseDynamicLoading(buttonRef);
  const { email, name } = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ContactSchema) });

  const onSubmit = async (contactData: IContactData) => {
    try {
      setLoading(true);
      const res = await createContact(contactData);
      if (res?.success) {
        showToast("success", "Your Message Sent Successfully!");
      } else {
        showToast("success", res?.message);
      }
    } catch (error) {
      showToast("error", "an error occurred. please try again later");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="grid gap-y-5">
      <h1
        className={`2xl:text-3xl xl:text:2xl lg:text-xl md:text-base sm:text-sm text-xs capitalize ${dancing_script.className}`}
      >
        Have a question
      </h1>
      <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-base uppercase">
        Get in touch
      </h1>
      <Form
        className="2xl:text-xl xl:text-base lg:text-sm md:text-xs text-[10px]"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      >
        <div className="grid gap-y-5">
          <div className="flex gap-x-5">
            <Input
              className="bg-[#fff] p-5 border-2 cursor-not-allowed h-[3em] border-[#E1E1E1] w-full"
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={email}
              readOnly
              error={errors.email?.message}
              register={register}
              autoFocus
            />
            <Input
              className="bg-[#fff] p-5 border-2 cursor-not-allowed h-[3em] border-[#E1E1E1] w-full"
              name="name"
              type="text"
              placeholder="Name"
              readOnly
              defaultValue={`${name.firstName} ${name.lastName}`}
              error={errors.name?.message}
              register={register}
              autoFocus
            />
          </div>
          <div>
            <Input
              className="bg-[#fff] p-5 border-2 h-[3em] border-[#E1E1E1] w-full"
              name="subject"
              type="text"
              placeholder="Subject"
              error={errors.subject?.message}
              register={register}
              autoFocus
            />
          </div>
          <div>
            <Input
              className="bg-[#fff] p-5 border-2 border-[#E1E1E1] w-full"
              textarea={true}
              name="message"
              type="text"
              placeholder="Message"
              error={errors.message?.message}
              register={register}
              autoFocus
            />
          </div>
          <button
            ref={buttonRef}
            className="submit-button 2xl:text-xl xl:text-base lg:text-sm md:text-xs text-[10px] w-1/3 h-[3em] rounded-sm relative flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader
                loading={loading}
                cssOverride={override1}
                size={loaderSize} // Set the loader size dynamically
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
}
