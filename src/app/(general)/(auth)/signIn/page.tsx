import UserLogin from "@/components/formComponent/UserLogin";
import { getUserFromCookie } from "@/lib/actions/Server/cookies";

import { redirect } from "next/navigation";

export default async function SignIn(searchParams: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getUserFromCookie();
  const { destination } = searchParams.searchParams;
  console.log(destination);

  if (user?.userEmail && destination) {
    redirect(`${destination}#${destination}`);
  } else if (user?.userEmail && !destination) {
    redirect("/");
  }

  return (
    <main>
      <UserLogin />
    </main>
  );
}
