// Server Component (ShowTeam)
import TeamDetailsButton from "./Buttons/TeamDetailsButton";
import JoinTeamButton from "./Buttons/JoinTeamButton";
import { getTeams } from "../lib/actions/Server/team";
import Pagination from "./Pagination";
import { ICreateTeam } from "../types/ICreateTeam";

export default async function ShowTeam({ page }: { page: number }) {
  // Get the page number from searchParams
  const { data, meta } = await getTeams(page); // Fetch teams based on current page

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-6xl">Groups</h1>
        <p
          className="text-xl lg:text-3xl underline"
          style={{ textUnderlineOffset: "0.4em", margin: "1rem" }}
        >
          Connect with your perfect match
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((team: ICreateTeam) => (
          <div
            key={team._id}
            className="border border-gray-300 p-4 rounded-lg bg-[#2e4262]"
          >
            <div className="mb-4">
              <h2 className="capitalize xl:text-3xl text-2xl font-bold text-white">
                {team.teamName}
              </h2>
            </div>
            <div className="mb-4">
              <p className="text-white">
                <strong>Destination:</strong> {team.destination}
              </p>
              <p className="text-white">
                <strong>Budget:</strong> {team.budget}
              </p>
              <p className="text-white">
                <strong>Current Members:</strong> {team.currentMembers}
              </p>
              <p className="text-white">
                <strong>Needed Members:</strong> {team.neededMembers}
              </p>
              <p className="text-white">
                <strong>Journey:</strong>{" "}
                {new Date(team.startDate).toLocaleDateString()} -{" "}
                {new Date(team.endDate).toLocaleDateString()}
              </p>
              <p className="text-white">
                <strong>Status:</strong> {team.teamStatus}
              </p>
            </div>
            <div className="flex gap-x-5 w-full">
              <TeamDetailsButton teamId={team._id} />
              {team.teamStatus && (
                <JoinTeamButton teamId={team._id} status={team.teamStatus} />
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination totalTeam={meta.count} limit={meta.limit} />
    </div>
  );
}
