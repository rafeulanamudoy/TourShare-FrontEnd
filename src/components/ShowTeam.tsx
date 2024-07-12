import { getTeams } from "@/lib/actions/Server/team";
import { ICreateTeam } from "@/types/ICreateTeam";

import React from "react";

import TeamDetailsButton from "./Buttons/TeamDetailsButton";
import JoinTeamButton from "./Buttons/JoinTeamButton";

export default async function ShowTeam() {
  const data = await getTeams();

  return (
    <div className="uppercase">
      <div className="grid  gap-y-5   ">
        <h1 className=" text-[#0C264C] 2xl:text-8xl xl:text-6xl   lg:text-4xl sm:text-3xl text-2xl text-center">
          Groups
        </h1>
        <p
          className="  text-[#0C264C]  2xl:text-4xl xl:text-3xl lg:text-xl sm:text-lg  text-base text-center  underline   "
          style={{ textUnderlineOffset: "0.4em", margin: "1rem" }}
        >
          Connect with your perfect match
        </p>
      </div>
      <div className=" ">
        <table className=" mx-auto  my-5 table-auto    border-collapse border border-slate-400 ">
          <thead
            className="    2xl:text-xl xl:text-lg lg:text-base  md:text-sm    sm:text-[8px] text-[4px]
           "
          >
            <tr className=" ">
              <th className=" border border-slate-600  p-2">Group Name</th>
              <th className=" border border-slate-600  p-2">Destination</th>
              <th className=" border border-slate-600  p-2">Budget</th>
              <th className=" border border-slate-600  p-2">Current Members</th>
              <th className=" border border-slate-600 p-2 ">Needed Members</th>
              <th className=" border border-slate-600 p-2 ">Start Journy</th>
              <th className=" border border-slate-600 p-2 ">End Journy</th>
              <th className=" border border-slate-600 p-2 ">Status</th>
              <th className=" border border-slate-600 p-2 ">Team Details</th>

              <th className=" border border-slate-600 p-2 ">Join</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((team: ICreateTeam) => {
              const formattedStartDate = new Date(
                team.startDate
              ).toLocaleDateString();
              const formattedEndDate = new Date(
                team.endDate
              ).toLocaleDateString();

              return (
                <tr
                  className=" border  2xl:text-lg xl:text-base lg:text-xs    md:text-[8px]  sm:text-[6px]    text-[3px] border-slate-600 text-center"
                  key={team._id}
                >
                  <td className=" border border-slate-600 p-2">
                    {team.teamName}
                  </td>
                  <td className=" border border-slate-600 p-2">
                    {team.destination}
                  </td>
                  <td className=" border border-slate-600 p-2">
                    {team.budget}
                  </td>
                  <td className=" border border-slate-600 p-2">
                    {team.currentMembers}
                  </td>
                  <td className=" border border-slate-600 p-2">
                    {team.neededMembers}
                  </td>
                  <td className=" border border-slate-600 p-2">
                    {formattedStartDate}
                  </td>
                  <td className=" border border-slate-600 p-2">
                    {formattedEndDate}
                  </td>
                  <td className=" border border-slate-600 p-2">
                    {team.teamStatus}
                  </td>
                  <td className=" border border-slate-600 p-2">
                    <TeamDetailsButton teamId={team?._id} />
                  </td>

                  {team.teamStatus && (
                    <td className=" border border-slate-600  p-2">
                      <JoinTeamButton
                        teamId={team._id}
                        status={team?.teamStatus}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
