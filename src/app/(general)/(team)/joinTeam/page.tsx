import TeamJoin from "@/components/FormComponent/TeamJoin";
import SkeletonLoading from "@/components/Loader/SkeletionLoading";

import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <main>
        <Suspense fallback={<SkeletonLoading />}>
          <TeamJoin />
        </Suspense>
      </main>
    </div>
  );
}
