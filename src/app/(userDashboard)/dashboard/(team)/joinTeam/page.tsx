import JoinTeamDeleteButton from "@/components/buttons/JoinTeamDeleteButton";
import TeamUpdateButton from "@/components/buttons/TeamUpdateButton";
import {
  getSingleJoinTeam,
  getSingleTeamById,
} from "@/lib/actions/Server/team";
import { getSingleUser } from "@/lib/actions/Server/user";
import { get } from "http";
import React from "react";

export default async function Team() {
  const {
    data: { email },
  } = await getSingleUser();
  const team = await getSingleJoinTeam(email);

  const teamInfo = await getSingleTeamById(team?.data?.teamInfo);
  console.log(teamInfo, "team info");

  const formattedStartDate = new Date(
    teamInfo?.data?.startDate
  ).toLocaleDateString();
  const formattedEndDate = new Date(
    teamInfo?.data?.endDate
  ).toLocaleDateString();

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
            ? " Detailed Overview of Your Team's Journey That You Jointed"
            : "You Currently Have no JoinTeam Details To Show "}
        </p>
      </div>
      {team?.data && teamInfo?.data && (
        <div className=" ">
          <table className=" mx-auto  my-5 table-auto    border-collapse border border-slate-400 ">
            <thead
              className="    2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[8px]
           "
            >
              <tr className="">
                <th className=" border border-slate-600  p-2">Destination</th>
                <th className=" border border-slate-600  p-2">
                  Team Leader Email
                </th>
                <th className=" border border-slate-600 p-2 ">
                  Team Leader Phone Number
                </th>
                <th className=" border border-slate-600 p-2 ">Start Journy</th>
                <th className=" border border-slate-600 p-2 ">End Journy</th>
                <th className=" border border-slate-600 p-2 ">Status</th>
                <th className=" border border-slate-600 p-2 ">Cancel</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className=" border  2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[8px] border-slate-600 text-center"
                key={team._id}
              >
                <td className=" border border-slate-600 p-2">
                  {teamInfo?.data?.destination}
                </td>
                <td className=" border border-slate-600 p-2">
                  {teamInfo?.data?.email}
                </td>
                <td className=" border border-slate-600 p-2">
                  {teamInfo?.data?.phoneNumber}
                </td>
                <td className=" border border-slate-600 p-2">
                  {formattedStartDate}
                </td>
                <td className=" border border-slate-600 p-2">
                  {formattedEndDate}
                </td>
                <td className=" border border-slate-600 p-2">
                  {teamInfo?.data?.teamStatus}
                </td>
                <td className=" border border-slate-600  p-2">
                  <JoinTeamDeleteButton id={team?.data?._id} />
                </td>
              </tr>
            </tbody>
          </table>
          {}
        </div>
      )}
    </div>
  );
}
