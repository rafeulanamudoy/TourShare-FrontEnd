import { ENUM_NOTIFICATION_STATUS } from "@/src/enums/notification";
import { INotification } from "@/src/types/INotification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type INotificationType = "privateMessage" | "joinTeam" | "createTeam";
export type INotificationStatus = "seen" | "unseen";

export type NotificationState = {
  notifications: INotification[];
};

const initialState: NotificationState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications.push(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(
        (notification) => notification._id === action.payload
      );
      if (index !== -1) {
        state.notifications[index].status = ENUM_NOTIFICATION_STATUS.SEEN;
      }
    },
    setNotification: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
    },
    clearNotification: (state) => {
      state.notifications = [];
    },
  },
});
export const {
  addNotification,
  markAsRead,
  setNotification,
  clearNotification,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
