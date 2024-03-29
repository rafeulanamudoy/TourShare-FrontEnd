import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ENUM_USER_ROLE, IUser, IUserPayload } from "../../../types/IUser";

const initialState: IUser = {
  user: {
    email: "",
    role: ENUM_USER_ROLE.CUSTOMER,
  },
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      console.log(payload, "i am from authSlice");

      state.user.email = payload.user.email;
      state.user.role = payload.user.role;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
