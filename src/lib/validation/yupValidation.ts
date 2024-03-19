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
  phoneNumber: yup.string().required("Phone Number is required"),
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
  confirmPassword: yup.string().required("Confirm Password is required"),
});
