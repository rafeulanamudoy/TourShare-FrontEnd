import SkeletonLoading from "@/components/Loader/SkeletionLoading";
import UserLogin from "@/components/formComponent/UserLogin";
import { getCookie } from "@/lib/actions/Server/cookies";

import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page(searchParams: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCookie("accessToken");
  let { destination, joinId } = searchParams.searchParams;
  //console.log(searchParams.searchParams, "destination");
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
        <UserLogin />
      </Suspense>
    </main>
  );
}
