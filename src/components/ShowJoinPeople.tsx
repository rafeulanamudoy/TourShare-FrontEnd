import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TeamAcceptButton from "./Buttons/TeamAcceptButton";
import StatusSelect from "./StatusSelect";
import TeamMessageButton from "./Buttons/TeamMessageButton";
import { IJoinTeam } from "../types/IJoinTeam";
import { ENUM_JOIN_TEAM_STATUS, IAccept } from "../types/ICreateTeam";

interface JoinPeopleProps {
  people: IJoinTeam;
  teamId: string;
}

export default function ShowJoinPeople({ people, teamId }: JoinPeopleProps) {
  const payload: IAccept | null =
    people && people?._id
      ? {
          members: people?.groupMember,
          joinTeamId: people?._id,
          status: people?.status as ENUM_JOIN_TEAM_STATUS,
          teamId: teamId,
          joinTeamEmail: people.email,
        }
      : null;

  return (
    <div className="overflow-x-auto">
      <table className="mx-auto my-5 table-auto border-collapse border border-slate-400 w-full">
        <thead className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          <tr>
            <th className="border border-slate-600 p-2">Email</th>
            <th className="border border-slate-600 p-2">Phone Number</th>
            <th className="border border-slate-600 p-2">Group Members</th>
            <th className="border border-slate-600 p-2">Connect</th>
            <th className="border border-slate-600 p-2">Accept Request</th>
            <th className="border border-slate-600 p-2">Confirm</th>
          </tr>
        </thead>
        <tbody className="text-[3px] sm:text-[6px] md:text-[10px] lg:text-xs xl:text-base 2xl:text-lg">
          <tr className="border border-slate-600 text-center">
            <td className="border border-slate-600 p-2 whitespace-nowrap">
              {people?.email}
            </td>
            <td className="border border-slate-600 p-2 whitespace-nowrap">
              {people?.phoneNumber}
            </td>
            <td className="border border-slate-600 p-2 whitespace-nowrap">
              {people?.groupMember}
            </td>
            <td className="border border-slate-600 p-2">
              <div className="flex justify-center">
                <TeamMessageButton email={people.email}>
                  <FontAwesomeIcon icon={faMessage} />
                </TeamMessageButton>
              </div>
            </td>
            <td className="border border-slate-600 p-2">
              <StatusSelect value={people?.status} />
            </td>
            <td className="border border-slate-600 p-2">
              {payload && teamId && <TeamAcceptButton payload={payload} />}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
