import { combineReducers } from "redux";
import authSlice from "./features/auth/authSlice";
import toggleSlice from "./features/toggle/toggleSlice";
import messagesSlice from "./features/messages/messagesSlice";
import notificationsSlice from "./features/notifications/notificationsSlice";
import { baseApi } from "./api/baseApi";

const rootReducer = combineReducers({
  auth: authSlice,
  toggle: toggleSlice,
  messages: messagesSlice,
  notifications: notificationsSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
