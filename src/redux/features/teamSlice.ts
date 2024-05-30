import { createSlice } from "@reduxjs/toolkit";

import { IToggle } from "@/types/IToggle";

const initialState: IToggle = {
  toggle: false,
};

export const togleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { setToggle } = togleSlice.actions;
export default togleSlice.reducer;
