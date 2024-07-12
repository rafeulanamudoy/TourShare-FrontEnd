import JoinTeamDeleteButton from "@/src/components/Buttons/JoinTeamDeleteButton";
import { getSingleJoinTeam } from "@/src/lib/actions/Server/team";
import { getSingleUser } from "@/src/lib/actions/Server/user";

export default async function page() {
  const {
    data: { email },
  } = await getSingleUser();
  const team = await getSingleJoinTeam(email);
  let formattedStartDate;
  let formattedEndDate;

  if (team?.data) {
    formattedStartDate = new Date(
      team?.data?.teamInfo?.startDate
    ).toLocaleDateString();
    formattedEndDate = new Date(
      team?.data?.teamInfo?.startDate
    ).toLocaleDateString();
  }

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
          {team?.data
            ? " Detailed Overview of Your Team's Journey That You Jointed"
            : "You Currently Have no JoinTeam Details To Show "}
        </p>
      </div>
      <div className=" ">
        {team?.data && (
          <table className=" mx-auto  my-5 table-auto    border-collapse border border-slate-400 ">
            <thead
              className="    2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[4px]
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
                <th className=" border border-slate-600 p-2 ">Team Status</th>
                <th className=" border border-slate-600 p-2 ">Request</th>
                <th className=" border border-slate-600 p-2 ">Cancel</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className=" border  2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[4px] border-slate-600 text-center"
                key={team?._id}
              >
                <td className=" border border-slate-600 p-2">
                  {team?.data?.teamInfo?.destination}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.teamInfo?.email}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.teamInfo?.phoneNumber}
                </td>
                <td className=" border border-slate-600 p-2">
                  {formattedStartDate}
                </td>
                <td className=" border border-slate-600 p-2">
                  {formattedEndDate}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.teamInfo?.teamStatus}
                </td>
                <td className=" border border-slate-600 p-2">
                  {team?.data?.status}
                </td>
                <td className=" border border-slate-600  p-2">
                  {team?.data?._id && (
                    <JoinTeamDeleteButton
                      id={team?.data?._id}
                      teamEmail={team?.data?.teamInfo?.email}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
