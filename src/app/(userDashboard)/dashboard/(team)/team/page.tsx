import ShowJoinPeople from "@/components/ShowJoinPeople";
import TeamUpdateButton from "@/components/buttons/TeamUpdateButton";
import { getSingleTeamByEmail } from "@/lib/actions/Server/team";
import { getSingleUser } from "@/lib/actions/Server/user";
import { IJoinPerson, IJoinTeam } from "@/types/IJoinTeam";
import React from "react";

export default async function Team() {
  const {
    data: { email },
  } = await getSingleUser();
  const team = await getSingleTeamByEmail(email);
  //console.log(team, "tream info");

  const formattedStartDate = new Date(
    team?.data?.startDate
  ).toLocaleDateString();
  const formattedEndDate = new Date(team?.data?.endDate).toLocaleDateString();

  return (
    <div className="uppercase my-10">
      <div className="grid  gap-y-5   ">
        <h1 className=" text-[#0C264C] 2xl:text-8xl xl:text-6xl   lg:text-4xl sm:text-3xl text-2xl text-center">
          Team Info
        </h1>
        <p
          className="  text-[#0C264C]  2xl:text-4xl xl:text-3xl lg:text-xl sm:text-lg  text-base text-center  underline   "
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
              className="    2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[5px]
           "
            >
              <tr className="">
                <th className=" border border-slate-600  p-2">Destination</th>
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
              </tr>
            </thead>
            <tbody>
              <tr
                className=" border  2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[5px] border-slate-600 text-center"
                key={team._id}
              >
                <td className=" border border-slate-600 p-2">
                  {team?.data?.destination}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.currentMembers}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.neededMembers}
                </td>
                <td className=" border border-slate-600 p-2">
                  {formattedStartDate}
                </td>
                <td className=" border border-slate-600 p-2">
                  {formattedEndDate}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.teamStatus}
                </td>
                <td className=" border border-slate-600  p-2">
                  <TeamUpdateButton />
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
