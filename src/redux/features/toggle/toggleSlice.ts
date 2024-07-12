import { ENUM_JOIN_TEAM_STATUS } from "@/src/types/ICreateTeam";
import { IToggle } from "@/src/types/IToggle";
import { ENUM_USER_ROLE } from "@/src/types/IUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
