"use client";

import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
  wrapperClass?: string;
  className?: string;
  textarea?: boolean;
  selectOptions?: { value: string; label: string }[];
  autoComplete?: string;

  defaultImageUrl?: string;
}

const Input: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  textarea,
  selectOptions,

  defaultImageUrl,

  ...rest
}) => {
  return (
    <div className="w-full   ">
      {label && (
        <label className="  " htmlFor={name}>
          {label}
        </label>
      )}
      <div>
        {textarea ? (
          <textarea
            className="   "
            aria-invalid={error ? "true" : "false"}
            {...register(name)}
            {...rest}
            autoComplete="on"
          />
        ) : selectOptions ? (
          <select
            className=""
            aria-invalid={error ? "true" : "false"}
            {...register(name)}
            {...rest}
            autoComplete="on"
          >
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className=" "
            aria-invalid={error ? "true" : "false"}
            {...register(name)}
            {...rest}
            autoComplete="on"
          />
        )}
        {error && (
          <div className="        ">
            <span style={{ fontSize: "0.6em" }} className="">
              {" "}
              {error}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
