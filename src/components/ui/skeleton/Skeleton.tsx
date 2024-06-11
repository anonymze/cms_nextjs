import type { PropsWithChildren } from "react";
import { cn } from "@/utils/libs/tailwind/helper";
import "./Skeleton.css";

type SuffixValueHeight = "%" | "px" | "rem" | "em" | "vh";

type PropsSkeleton = PropsWithChildren & {
	animated?: boolean;
	height?: `${number}${SuffixValueHeight}`;
} & React.HTMLAttributes<HTMLDivElement>;

const SkeletonCard: React.FC<PropsSkeleton> = ({ animated, height, className }) => {
	return (
		<div
			style={{ height }}
			className={cn("background-skeleton", className, { animated })}
			role="presentation"
		/>
	);
};

const SkeletonPage: React.FC<PropsSkeleton> = ({ animated }) => {
	return <div className={cn("background-skeleton", { animated })} role="presentation" />;
};

export { SkeletonCard, SkeletonPage };
