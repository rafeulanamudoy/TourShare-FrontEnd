import { File } from "buffer";

export type IUser = {
  user: {
    email: string;
    role: string;
  };
  isLoading: boolean;
  isError: boolean;
  error: string;
};

export type ISignUpData = {
  name: {
    firstName: string;
    lastName: string;
  };
  id?: string;

  email: string;
  role: string;
  profileImage: FileList;
  password: string;

  confirmPassword?: string;
  phoneNumber: string;
  superRoleKey?: string;
};

export type ISignInData = {
  email: string;
  password: string;
  role?: Role;
};

export type IUserResponseData = {
  email: string;
  role?: string;
  password: string;
};

enum Role {
  customer,
  admin,
  superAdmin,
}
