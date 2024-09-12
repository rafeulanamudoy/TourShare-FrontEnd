"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoading() {
  return (
    <Skeleton className=" z-10" baseColor="#C0C0C0" count={11} height={10} />
  );
}
