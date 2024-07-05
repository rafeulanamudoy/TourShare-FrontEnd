export type IActivity = {
  day: string;
  morning: string;
  afternoon: string;
  evening: string;
  dinner: string;
};

export type ICreateTeam = {
  _id: string;
  email: string;

  phoneNumber: string;
  teamName: string;
  address: string;
  destination: string;
  currentMembers: number;
  neededMembers: number;
  nationalIdNumber: string;
  budget: number;
  teamDetails?: ITeamDetails;
  startDate: Date;
  endDate: Date;
  teamStatus?: TeamStatus;
};
export type ITeamDetails = {
  description: string;
  depurture: string;
  depurtureTime: string;
  returnTime: string;

  accommodations: string;
  transportation: TRANSPORTATION;
  activities: { activity: string }[];

  costBreakDown: string; // optional field
  responsibilities?: { responsibility: string }[]; // optional field
};
export enum TeamStatus {
  Ongoing = "ongoing",
  Closed = "closed",
}
export enum TRANSPORTATION {
  BUS = "bus",
  TRAIN = "train",
  AIRPLANE = "airplane",
}
export type IAccept = {
  members: number;
  joinTeamEmail?: string;
  joinTeamId: string;
  status: ENUM_JOIN_TEAM_STATUS;
  teamId?: string;
};
export enum ENUM_JOIN_TEAM_STATUS {
  ACCEPTED = "accepted",
  NOTACCEPTED = "notAccepted",
  PENDING = "pending",
}
export type IJoinTeamStatus = "pending" | "accepted" | "notAccepted";
