import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IToggle } from "@/types/IToggle";
import { ENUM_JOIN_TEAM_STATUS } from "@/types/ICreateTeam";

const initialState: IToggle = {
  toggle: false,
  requestValue: ENUM_JOIN_TEAM_STATUS.PENDING,
};

export const togleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },

    setToggleTeamRequest: (
      state,
      action: PayloadAction<ENUM_JOIN_TEAM_STATUS>
    ) => {
      state.requestValue = action.payload;
    },
  },
});

export const { setToggle, setToggleTeamRequest } = togleSlice.actions;
export default togleSlice.reducer;
