"use client";

import React from "react";
import { cn } from "@/utils/libs/tailwind";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  fill?: boolean;
  outline?: boolean;
  large?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, large, className, fill = true, outline = true, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center justify-center rounded-md",
          "font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50 shadow",
          large ? "px-5 py-3 text-base" : "px-4 py-2 text-sm",
          fill
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-transparent text-secondary-foreground hover:bg-primary/10",
          !fill && outline && "border-[1px]",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
