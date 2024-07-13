import TeamDeleteButton from "@/src/components/Buttons/TeamDeleteButton";
import TeamUpdateButton from "@/src/components/Buttons/TeamUpdateButton";
import ShowJoinPeople from "@/src/components/ShowJoinPeople";
import { getSingleTeamByEmail } from "@/src/lib/actions/Server/team";
import { getSingleUser } from "@/src/lib/actions/Server/user";
import { IJoinPerson } from "@/src/types/IJoinTeam";
import { formattedDate } from "@/src/utilities/TimeFormat";

export default async function page() {
  const {
    data: { email },
  } = await getSingleUser();
  const team = await getSingleTeamByEmail(email);
  //console.log(team, "tream info");

  return (
    <div className="uppercase my-10">
      <div className="grid  md:gap-y-5  gap-2  ">
        <h1 className=" text-[#0C264C] 2xl:text-8xl xl:text-6xl   lg:text-4xl sm:text-2xl text-xl text-center">
          Team Info
        </h1>
        <p
          className="  text-[#0C264C]  2xl:text-4xl xl:text-3xl lg:text-xl sm:text-base  text-sm text-center  underline   "
          style={{ textUnderlineOffset: "0.4em", margin: "1rem" }}
        >
          {team.data
            ? " Detailed Overview of Your Team's Journey"
            : "You Currently Have no Team Details To Show"}
        </p>
      </div>
      {team.data && (
        <div className=" ">
          <table className=" mx-auto  my-5 table-auto    border-collapse border border-slate-400 ">
            <thead
              className="     2xl:text-xl xl:text-lg lg:text-base  md:text-sm    text-[7px] 
           "
            >
              <tr className="">
                <th className=" border border-slate-600  p-2">Team Name</th>
                <th className=" border border-slate-600  p-2">Destination</th>
                <th className=" border border-slate-600  p-2">Budget</th>
                <th className=" border border-slate-600  p-2">
                  Current Members
                </th>
                <th className=" border border-slate-600 p-2 ">
                  Needed Members
                </th>
                <th className=" border border-slate-600 p-2 ">Start Journy</th>
                <th className=" border border-slate-600 p-2 ">End Journy</th>
                <th className=" border border-slate-600 p-2 ">Status</th>
                <th className=" border border-slate-600 p-2 ">Update</th>
                <th className=" border border-slate-600 p-2 ">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className=" border   2xl:text-lg xl:text-base lg:text-xs    md:text-[10px]  text-[6px]     border-slate-600 text-center"
                key={team._id}
              >
                <td className=" border border-slate-600 p-2">
                  {team?.data?.teamName}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.destination}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.budget}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.currentMembers}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.neededMembers}
                </td>
                <td className=" border border-slate-600 p-2">
                  {formattedDate(team.data.startDate)}
                </td>
                <td className=" border border-slate-600 p-2">
                  {formattedDate(team.data.endDate)}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.teamStatus}
                </td>
                <td className=" border border-slate-600  p-2">
                  <TeamUpdateButton />
                </td>
                <td className=" border border-slate-600  p-2">
                  <TeamDeleteButton id={team?.data?._id} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div>
        <h1
          className=" text-[#0C264C]  2xl:text-4xl xl:text-3xl lg:text-xl sm:text-lg  text-base text-center  underline"
          style={{ textUnderlineOffset: "0.4em", margin: "1rem" }}
        >
          Join People Request Info
        </h1>
        {team?.data?.joinPeople.map((people: IJoinPerson) => (
          <ShowJoinPeople
            key={people.joinTeamId?._id}
            people={people.joinTeamId}
            teamId={team?.data?._id}
          />
        ))}
      </div>
    </div>
  );
}
