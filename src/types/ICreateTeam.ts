export type ICreateTeam = {
  email: string;
  _id: string;
  phoneNumber: string;
  address: string;
  destination: string;
  currentMembers: number;
  neededMembers: number;
  nationalIdNumber: string;
  startDate: Date;
  endDate: Date;
  teamStatus?: TeamStatus;
};

export enum TeamStatus {
  Ongoing = "ongoing",
  Closed = "closed",
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
