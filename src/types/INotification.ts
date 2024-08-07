export type INotification = {
  _id: string;
  recipient?: string;
  sender: string;
  message: string;
  type: INotificationType;
  status: INotificationStatus;
  createdAt: string;
};
export type NotificationPayload = {
  recipient: string;
  sender: string;
  message: string;
  type: INotificationType;
};
export type INotificationType =
  | "privateMessage"
  | "joinTeamRequestStatus"
  | "joinTeamStatusUpdate"
  | "updateCreateTeam"
  | "deleteCreateTeam";
export type INotificationStatus = "seen" | "unseen";
