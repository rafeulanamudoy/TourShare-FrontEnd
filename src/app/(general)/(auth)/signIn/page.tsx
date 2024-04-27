import UserLogin from "@/components/formComponent/UserLogin";
import { getUserFromCookie } from "@/lib/actions/Server/cookies";

import { redirect } from "next/navigation";

export default async function SignIn(searchParams: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getUserFromCookie();
  const { destination } = searchParams.searchParams;

  if (user?.userEmail && destination) {
    redirect(`${destination}`);
  } else if (user?.userEmail && !destination) {
    redirect("/");
  }

  return (
    <main>
      <UserLogin />
    </main>
  );
}
