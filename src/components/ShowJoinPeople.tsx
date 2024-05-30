import { IJoinTeam } from "@/types/IJoinTeam";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ENUM_JOIN_TEAM_STATUS, IAccept } from "@/types/ICreateTeam";
import TeamAcceptButton from "./buttons/TeamAcceptButton";
import StatusSelect from "./StatusSelect";

interface JoinPeopleProps {
  people: IJoinTeam;
  teamId: string;
}

export default function ShowJoinPeople({ people, teamId }: JoinPeopleProps) {
  //console.log(people, "from showjoinpeople");
  const payload: IAccept | null =
    people && people?._id
      ? {
          members: people?.groupMember,
          joinTeamId: people?._id,
          status: people?.status as ENUM_JOIN_TEAM_STATUS,
          teamId: teamId, // Ensure correct typing
        }
      : null;

  return (
    <div className=" ">
      <table className=" mx-auto  my-5 table-auto    border-collapse border border-slate-400 ">
        <thead
          className="    2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[8px]
           "
        >
          <tr className="">
            <th className=" border border-slate-600  p-2">Email</th>
            <th className=" border border-slate-600  p-2">Phone Number</th>

            <th className=" border border-slate-600 p-2 ">Group Members</th>

            <th className=" border border-slate-600 p-2 ">Connect</th>
            <th className=" border border-slate-600 p-2 ">Accept Request</th>
            <th className=" border border-slate-600 p-2 ">Confirm</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className=" border  2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[5px] border-slate-600 text-center"
            key={people?._id}
          >
            <td className=" border border-slate-600 p-2">{people?.email}</td>

            <td className=" border border-slate-600 p-2">
              {people?.phoneNumber}
            </td>
            <td className=" border border-slate-600 p-2">
              {people?.groupMember}
            </td>
            <td className=" border border-slate-600 p-2">
              <FontAwesomeIcon icon={faMessage} />
            </td>
            <td className=" border border-slate-600  p-2">
              <StatusSelect value={people?.status} />
            </td>
            <td className=" border border-slate-600  p-2">
              {payload && teamId && <TeamAcceptButton payload={payload} />}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
