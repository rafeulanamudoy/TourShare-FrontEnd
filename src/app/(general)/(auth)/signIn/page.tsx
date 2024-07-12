import SignIn from "@/src/components/FormComponent/SignIn";
import SkeletonLoading from "@/src/components/Loader/SkeletionLoading";
import { getCookie } from "@/src/lib/actions/Server/cookies";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page(searchParams: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCookie("accessToken");
  let { destination, joinId } = searchParams.searchParams;

  if (typeof destination === "string") {
    destination = destination.replace(/^\/+/, "");
  }

  if (user?.userEmail && destination && joinId) {
    redirect(`${destination}#${destination}?joinId=${joinId}`);
  } else if (user?.userEmail && destination) {
    redirect(`${destination}#${destination}`);
  } else if (user?.userEmail && !destination) {
    redirect("/");
  }

  return (
    <main>
      <Suspense fallback={<SkeletonLoading />}>
        <SignIn />
      </Suspense>
    </main>
  );
}
