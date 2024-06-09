import CreateAccount from "@/components/formComponent/CreateAccount";
import { getCookie } from "@/lib/actions/Server/cookies";

export default async function page() {
  return (
    <main>
      <CreateAccount />
    </main>
  );
}
