import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/utils/libs/tailwind/helper";
import Link from "next/link";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import type { ButtonProps } from "../Button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn("mx-auto flex w-full justify-center", className)}
		{...props}
	/>
);

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
	({ className, ...props }, ref) => (
		<ul ref={ref} className={cn("flex flex-row items-center gap-2", className)} {...props} />
	),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("flex items-center", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
	isDisabled?: boolean;
} & ButtonProps &
	React.ComponentProps<typeof Link | any>;

const PaginationLink = ({ className, isActive, isDisabled, ...props }: PaginationLinkProps) => (
	<PaginationItem>
		<Link
			onClick={(ev) => (isDisabled || isActive) && ev.preventDefault()}
			aria-disabled={isDisabled || false}
			aria-current={isActive ? "page" : undefined}
			className={cn(
				"flex items-center px-3 py-1 border rounded-sm",
				isActive && "bg-muted cursor-default",
				isDisabled && "text-muted cursor-not-allowed",
				!isDisabled && "hover:bg-muted",
				className,
			)}
			{...props}
		/>
	</PaginationItem>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => {
	const lang = React.useContext(LangContext);
	return (
		<PaginationLink aria-label={i18n[lang]("GO_PREVIOUS_PAGE")} className={className} {...props}>
			<ChevronLeft className="h-4 w-4" />
			<span className="pl-[0.1rem]">{i18n[lang]("PREVIOUS")}</span>
		</PaginationLink>
	);
};
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  const lang= React.useContext(LangContext);
	return (
		<PaginationLink aria-label={i18n[lang]("GO_NEXT_PAGE")} className={className} {...props}>
			<span className="pr-[0.1rem]">{i18n[lang]("NEXT")}</span>
			<ChevronRight className="h-4 w-4" />
		</PaginationLink>
	);
};

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
	<span aria-hidden className={cn(className)} {...props}>
		<MoreHorizontal className="h-4 w-4" />
	</span>
);

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
