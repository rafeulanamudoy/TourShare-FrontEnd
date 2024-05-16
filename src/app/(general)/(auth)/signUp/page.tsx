import CreateAccount from "@/components/formComponent/CreateAccount";
import { getUserFromCookie } from "@/lib/actions/Server/cookies";

import { redirect } from "next/navigation";

export default async function page() {
  return (
    <main>
      <CreateAccount />
    </main>
  );
}
