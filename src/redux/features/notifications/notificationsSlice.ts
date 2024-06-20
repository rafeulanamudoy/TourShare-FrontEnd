// src/redux/slices/messagesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type INotificationType = "privateMessage" | "joinTeam" | "createTeam";
export type INotificationStatus = "seen" | "unseen";
export type Notification = {
  _id: string;
  sender: string;
  message: string;

  type: INotificationType;
  status: INotificationStatus;
};

export type NotificationState = {
  notifications: Notification[];
};

const initialState: NotificationState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
