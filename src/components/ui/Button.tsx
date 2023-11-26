"use client";

import React from "react";
import { cn } from "@/utils/libs/shadcn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  fill?: boolean;
  outline?: boolean;
  large?: boolean;
  secondary?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, large, secondary, className, disabled, fill = true, outline = true, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center justify-center rounded-md",
          "font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50 shadow",
          large ? "px-6 py-4 text-base" : "px-4 py-2 text-sm",
          fill
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-transparent text-secondary-foreground hover:bg-primary/10",
          !fill && outline && "border-[1px]",
          secondary ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : "",
          className,
        )}
      >
        {disabled && (
          <svg
            className="absolute w-6 h-6 text-primary-foreground animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 2a10 10 0 00-7.64 16.36L12 22l7.64-3.64A10 10 0 0012 2z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
