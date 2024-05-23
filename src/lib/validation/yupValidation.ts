import * as yup from "yup";

const validateImageFileType = (value: any): boolean => {
  const fileList = value as FileList;
  if (!fileList || !fileList.length || !fileList[0]) return false;
  const validMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  return validMimeTypes.includes(fileList[0].type);
};

export const SignUpSchema = yup.object().shape({
  name: yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
  }),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(
      /^01\d{9}$/,
      "Phone number must start with 01 and contain exactly 11 digits"
    ),
  profileImage: yup
    .mixed()
    .test("fileType", "Only PNG, JPG, JPEG are allowedu", validateImageFileType)
    .test(
      "fileSize",
      "File size must be less than 1 MB",
      (value: any) => value && value[0] && value[0].size / 1024 / 1024 < 1
    )
    .required("Profile Image is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()

    .required("Password is required"),
});

export const UpdateSchema = yup.object().shape({
  name: yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
  }),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\+88\d{11}$/, "Invalid phone number format"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  profileImage: yup
    .mixed()
    .test("fileType", "Only PNG, JPG, JPEG are allowedu", validateImageFileType)
    .test(
      "fileSize",
      "File size must be less than 1 MB",
      (value: any) => value && value[0] && value[0].size / 1024 / 1024 < 1
    )
    .required("Profile Image is required"),
});
export const CreateTeamSchema = yup.object().shape({
  destination: yup.string().required("Destination is required"),

  address: yup.string().required("Address is required"),
  currentMembers: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("Current members count is required"),
  neededMembers: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("Needed members count is required"),
  nationalIdNumber: yup.string().required("National ID Number is required"),
  startDate: yup
    .date()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("Start date is required"),
  endDate: yup
    .date()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("End date is required"),
});
export const JoinTeamSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  groupMember: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("Groupm member  count is required"),

  nationalIdNumber: yup.string().required("National id number is required"),
});
