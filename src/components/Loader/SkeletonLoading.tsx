"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonLoadingProps {
  height: number;
  count: number; // Adjust type as needed
}

export default function SkeletonLoading({
  height,
  count,
}: SkeletonLoadingProps) {
  return (
    <Skeleton
      className="z-10"
      baseColor="#D3D3D3"
      count={count}
      height={height}
    />
  );
}
