import { combineReducers } from "redux";
import authSlice from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import toggleSlice from "./features/toggle/toggleSlice";
import messagesSlice from "./features/messages/messagesSlice";
import notificationsSlice from "./features/notifications/notificationsSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  toggle: toggleSlice,
  messages: messagesSlice,
  notifications: notificationsSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
