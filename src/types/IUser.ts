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
  role: Role;
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

export type ISigninResponseData = {
  email: string;
  accessToken: string;
};

enum Role {
  customer,
  admin,
  superAdmin,
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
