import { combineReducers } from "redux";
import authSlice from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import toggleSlice from "./features/toggle/toggleSlice";

// import slices

const rootReducer = combineReducers({
  auth: authSlice,
  toggle: toggleSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
