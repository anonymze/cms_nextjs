import type { PropsWithChildren } from "react";
import "./Skeleton.css";
import { cn } from "@/utils/libs/tailwind";

type PropsSkeleton = PropsWithChildren & { animated?: boolean };

const SkeletonCard: React.FC<PropsSkeleton> = ({ animated }) => {
  return (
    <div
      className={cn("background-skeleton", { animated: animated ? true : false })}
      role="presentation"
    ></div>
  );
};

const SkeletonPage: React.FC<PropsSkeleton> = ({ animated }) => {
  return (
    <div
      className={cn("background-skeleton", { animated: animated ? true : false })}
      role="presentation"
    ></div>
  );
};

export { SkeletonCard, SkeletonPage };
