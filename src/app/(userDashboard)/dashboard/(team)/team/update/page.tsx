import UpdateTeam from "@/src/components/FormComponent/UpdateTeam";
import { getSingleTeamByEmail } from "@/src/lib/actions/Server/team";
import { getSingleUser } from "@/src/lib/actions/Server/user";

export default async function page() {
  const {
    data: { email },
  } = await getSingleUser();

  const team = await getSingleTeamByEmail(email);

  return (
    <div className="my-10">
      <UpdateTeam team={team?.data} />
    </div>
  );
}
