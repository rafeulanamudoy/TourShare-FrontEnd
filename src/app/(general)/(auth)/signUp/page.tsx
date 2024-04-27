import CreateAccount from "@/components/formComponent/CreateAccount";
import { getUserFromCookie } from "@/lib/actions/Server/cookies";

import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUserFromCookie();

  // if (user?.userEmail) {
  //   redirect("/");
  // }
  return (
    <main>
      <CreateAccount />
    </main>
  );
}
