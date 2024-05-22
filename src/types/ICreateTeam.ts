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
