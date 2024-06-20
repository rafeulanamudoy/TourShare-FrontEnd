export type PrivateMessagePayload = {
  from: string;
  message: string;
  timestamp: string;
};

export type MessageNotificationPayload = {
  from: string;
  message: string;
};
