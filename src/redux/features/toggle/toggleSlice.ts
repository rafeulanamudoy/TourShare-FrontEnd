import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IToggle } from "@/types/IToggle";
import { ENUM_JOIN_TEAM_STATUS } from "@/types/ICreateTeam";
import { ENUM_USER_ROLE } from "@/types/IUser";

const initialState: IToggle = {
  toggle: false,
  requestValue: ENUM_JOIN_TEAM_STATUS.PENDING,
  roleValue: ENUM_USER_ROLE.CUSTOMER,
};

export const togleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    setToggoleRole: (state, action: PayloadAction<ENUM_USER_ROLE>) => {
      state.roleValue = action.payload;
    },
    setToggleTeamRequest: (
      state,
      action: PayloadAction<ENUM_JOIN_TEAM_STATUS>
    ) => {
      state.requestValue = action.payload;
    },
  },
});

export const { setToggle, setToggleTeamRequest, setToggoleRole } =
  togleSlice.actions;
export default togleSlice.reducer;
