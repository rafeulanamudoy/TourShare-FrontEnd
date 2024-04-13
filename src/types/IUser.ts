export type IUser = {
  user: {
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
    role: ENUM_USER_ROLE;
    profileImage: {
      url: string;
      public_id: string;
    };
  };
};

export type ISignUpData = {
  name: {
    firstName: string;
    lastName: string;
  };
  id?: string;

  email: string;
  role: ENUM_USER_ROLE;
  profileImage: FileList;
  password: string;

  confirmPassword?: string;
  phoneNumber: string;
  superRoleKey?: string;
};

export type ISignInData = {
  email: string;
  password: string;
};

export enum ENUM_USER_ROLE {
  SUPER_ADMIN = "superAdmin",
  ADMIN = "admin",
  CUSTOMER = "customer",
  DEFAULT = "",
}

export type ISendResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string | null;
  data?: T | null;
  meta?: {
    page: number;
    limit: number;
    count?: number;
  };
};
