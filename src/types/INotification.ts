export type INotification = {
  recipient: string;
  sender: string;
  message: string;
  type: INotificationType;
  status: INotificationStatus;
};
export type INotificationType = "privateMessage" | "joinTeam" | "createTeam";
export type INotificationStatus = "seen" | "unseen";
