import UserLogin from "@/components/formComponent/UserLogin";
import { getUserFromCookie } from "@/lib/actions/Server/cookies";

import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getUserFromCookie();

  if (user?.userEmail) {
    redirect("/");
  }
  return (
    <main>
      <UserLogin />
    </main>
  );
}
