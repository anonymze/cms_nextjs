"use client";

import React from "react";
import { cn } from "@/utils/libs/tailwind/helper";
import { SpinnerLoader } from "./loader/Loader";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	className?: string;
	fill?: boolean;
	outline?: boolean;
	large?: boolean;
	secondary?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			isLoading,
			large,
			secondary,
			className,
			disabled,
			fill = true,
			outline = true,
			...props
		},
		ref,
	) => {
		return (
			<button
				type="button"
				ref={ref}
				className={cn(
					"inline-flex items-center justify-center rounded-md",
					"font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
					"disabled:pointer-events-none disabled:opacity-50 shadow",
					large ? "px-6 py-4 text-base" : "px-4 py-2 text-sm",
					fill
						? "bg-primary text-primary-foreground hover:bg-primary/90"
						: "bg-transparent text-secondary-foreground hover:bg-primary/10",
					!fill && outline && "border-[2px]",
					secondary ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : "",
					className,
				)}
				disabled={disabled}
				aria-disabled={disabled}
				{...props}
			>
				{isLoading && <SpinnerLoader className="mr-2" />}
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";

export { Button };
