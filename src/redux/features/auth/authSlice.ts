import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ENUM_USER_ROLE, IUser } from "../../../types/IUser";
import { stat } from "fs";

const initialState: IUser = {
  user: {
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    role: ENUM_USER_ROLE.DEFAULT,
    profileImage: {
      url: "",
      public_id: "",
    },
    phoneNumber: "",
    _id: "",
    emailVerified: false,
  },
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      // console.log(payload, "i am from authSlice");

      state.user.email = payload.user.email;
      state.user.role = payload.user.role;
      state.user.profileImage = payload.user.profileImage;
      state.user.name = payload.user.name;
      state.user.phoneNumber = payload.user.phoneNumber;
      state.user._id = payload.user._id;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
