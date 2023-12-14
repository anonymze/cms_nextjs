import type { PropsWithChildren } from "react";
import { cn } from "@/utils/libs/shadcn";
import "./Skeleton.css";

type SuffixValueHeight = '%' | 'px' | 'rem' | 'em' | 'vh'

type PropsSkeleton<T = undefined> = PropsWithChildren & {
  animated?: boolean;
  height?: T extends `${string}${SuffixValueHeight}` ? T : never
}

const SkeletonCard = <T = undefined>({ animated, height }: PropsSkeleton<T>) => {
  return (
    <div style={{ height }} className={cn("background-skeleton", { animated })} role="presentation"></div>
  );
};

const SkeletonPage: React.FC<PropsSkeleton> = ({ animated }) => {
  return <div className={cn("background-skeleton", { animated })} role="presentation"></div>;
};

export { SkeletonCard, SkeletonPage };