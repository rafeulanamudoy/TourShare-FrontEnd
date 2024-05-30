export type IJoinTeam = {
  phoneNumber: string;
  _id?: string;
  email: string;
  address: string;

  groupMember: number;

  nationalIdNumber: string;
  teamInfo?: string;
  status: string;
};

export enum ENUM_jOIN_TEAM_STATUS {
  ACCEPTED = "accepted",
  NOTACCEPTED = "notAccepted",
  PENDING = "pending",
}
export type IJoinPerson = {
  joinTeamId: IJoinTeam;
};
