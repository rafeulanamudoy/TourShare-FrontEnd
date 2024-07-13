"use client";
import React, { useEffect, useState } from "react";
import TeamDetailsButton from "./Buttons/TeamDetailsButton";
import JoinTeamButton from "./Buttons/JoinTeamButton";
import { getTeams } from "../lib/actions/Server/team";
import { ICreateTeam } from "../types/ICreateTeam";

export default function ShowTeam() {
  const [data, setData] = useState<ICreateTeam[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teams = await getTeams();
        setData(teams.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="uppercase">
      <div className="grid lg:gap-y-5 gap-y-2">
        <h1 className="text-[#0C264C] text-4xl lg:text-6xl text-center">
          Groups
        </h1>
        <p
          className="text-[#0C264C] text-xl lg:text-3xl text-center underline"
          style={{ textUnderlineOffset: "0.4em", margin: "1rem" }}
        >
          Connect with your perfect match
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="mx-auto my-5 table-auto border-collapse border border-slate-400">
          <thead className="text-sm lg:text-base">
            <tr>
              <th className="border border-slate-600 p-2 min-w-[100px] lg:min-w-[150px]">
                Group Name
              </th>
              <th className="border border-slate-600 p-2 min-w-[100px] lg:min-w-[150px]">
                Destination
              </th>
              <th className="border border-slate-600 p-2 min-w-[80px] lg:min-w-[120px]">
                Budget
              </th>
              <th className="border border-slate-600 p-2 min-w-[80px] lg:min-w-[120px]">
                Current Members
              </th>
              <th className="border border-slate-600 p-2 min-w-[80px] lg:min-w-[120px]">
                Needed Members
              </th>
              <th className="border border-slate-600 p-2 min-w-[100px] lg:min-w-[150px]">
                Start Journey
              </th>
              <th className="border border-slate-600 p-2 min-w-[100px] lg:min-w-[150px]">
                End Journey
              </th>
              <th className="border border-slate-600 p-2 min-w-[80px] lg:min-w-[120px]">
                Status
              </th>
              <th className="border border-slate-600 p-2 min-w-[100px] lg:min-w-[150px]">
                Team Details
              </th>
              <th className="border border-slate-600 p-2 min-w-[60px] lg:min-w-[90px]">
                Join
              </th>
            </tr>
          </thead>
          <tbody className="text-xs lg:text-sm">
            {data.map((team) => (
              <tr
                key={team._id}
                className="border text-center border-slate-600"
              >
                <td className="border border-slate-600 p-2">{team.teamName}</td>
                <td className="border border-slate-600 p-2">
                  {team.destination}
                </td>
                <td className="border border-slate-600 p-2">{team.budget}</td>
                <td className="border border-slate-600 p-2">
                  {team.currentMembers}
                </td>
                <td className="border border-slate-600 p-2">
                  {team.neededMembers}
                </td>
                <td className="border border-slate-600 p-2">
                  {new Date(team.startDate).toLocaleDateString()}
                </td>
                <td className="border border-slate-600 p-2">
                  {new Date(team.endDate).toLocaleDateString()}
                </td>
                <td className="border border-slate-600 p-2">
                  {team.teamStatus}
                </td>
                <td className="border border-slate-600 p-2">
                  <TeamDetailsButton teamId={team._id} />
                </td>
                {team.teamStatus && (
                  <td className="border border-slate-600 p-2">
                    <JoinTeamButton
                      teamId={team._id}
                      status={team.teamStatus}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
