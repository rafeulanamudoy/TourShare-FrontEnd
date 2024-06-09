import SkeletonLoading from "@/components/Loader/SkeletionLoading";
import JoinTeam from "@/components/formComponent/JoinTeam";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <main>
        <Suspense fallback={<SkeletonLoading />}>
          <JoinTeam />
        </Suspense>
      </main>
    </div>
  );
}
