import { combineReducers } from "redux";
import authSlice from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";

// import slices

const rootReducer = combineReducers({
  auth: authSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
