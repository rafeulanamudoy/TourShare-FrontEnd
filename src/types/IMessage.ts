export type IMessageUser = {
  email: string;
  _id: string;
};

export type IConvirsationList = {
  messageUser: IMessageUser[];
};

export type ImessageResponse = {
  _id: string;
  sender: string;
  recipient: string;
  message: string;
  createdAt: string;
};
export type ICreateMessage = {
  sender: string;
  recipient: string;
  message: string;
};
