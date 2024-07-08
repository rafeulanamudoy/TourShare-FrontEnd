import { ENUM_JOIN_TEAM_STATUS } from "./ICreateTeam";
import { ENUM_USER_ROLE } from "./IUser";

export type IToggle = {
  toggle: boolean;
  requestValue: ENUM_JOIN_TEAM_STATUS;
  roleValue: ENUM_USER_ROLE;
};
