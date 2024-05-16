export type ICreateTeam = {
  email: string;

  phoneNumber: string;
  address: string;
  destination: string;
  currentMembers: number;
  neededMembers: number;
  nationalIdNumber: string;
  startDate: Date;
  endDate: Date;
  countryCode?: string;
};
