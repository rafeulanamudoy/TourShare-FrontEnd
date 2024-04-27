"use client";

import { FC, createElement } from "react";
import { ReactNode } from "react";

export type classNameType = string;
export type idType = string;
export type childrenType = ReactNode;

export interface IFormProps {
  defaultValues?: any;
  children?: childrenType;
  buttonLabel?: string;
  onSubmit?: any;
  handleSubmit?: any;

  register?: any;
  className?: classNameType;
  id?: idType;
}

const Form: FC<IFormProps> = ({
  defaultValues,

  children,
  onSubmit,
  handleSubmit,
  register,
  ...rest
}) => {
  return (
    <form autoComplete="off" action={handleSubmit(onSubmit)} {...rest}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child?.props?.name
              ? createElement(child?.type, {
                  ...{
                    ...child?.props,
                    register,
                    key: child?.props?.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default Form;
