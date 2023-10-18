"use client"

import { cn } from "@/utils/libs/utils"
import type { ButtonHTMLAttributes } from "react"

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode,
  className?: string
}

const Button: React.FC<PropsButton> = ({ children, className }, props) => {
  return (
    <button {...props} className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2",
    className)}>
        {children}
    </button>
  )
}

export { Button }