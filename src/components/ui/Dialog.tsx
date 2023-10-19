import  React from "react"
import { cn } from "@/utils/libs/utils"
import { X } from "lucide-react";
import { SeparatorHorizontal } from "./Separator"
import { Button } from "./Button";

import type { PropsWithChildren } from "react"

export interface DialogProps
  extends React.DialogHTMLAttributes<HTMLDialogElement> {}

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
    ({ children, className, ...props }, ref) => {
      return (
        <dialog className={cn("fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[50vh] h-[30vh] max-w-[55rem] bg-popover text-popover-foreground p-4 rounded-md border-[1px]", className)} {...props} ref={ref}>
            <form method="dialog">
                {children}
            </form>
        </dialog>
      )
    }
  )

Dialog.displayName = "Dialog";

const DialogHeader: React.FC<{ title: string }> = ({title}) => {
    return (
        <>
            <div className="flex items-center justify-between pb-2">
                <h3>{title}</h3>               
                <Button outline={false} fill={false} aria-label="close" formNoValidate><X className="w-5 h-5 cursor-pointer" /></Button>
            </div>
            <SeparatorHorizontal />
        </>
    )
}

const DialogBody: React.FC<PropsWithChildren> = () => {
    return (
        <div className="py-4">
                body
        </div>
    )
}

const DialogFooter: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="flex items-center gap-2 [&>button:first-of-type]:ml-auto">
            <Button fill={false} aria-label="close" formNoValidate>Annuler</Button>
            {children}
        </div>
    )
}

DialogFooter.displayName = "DialogFooter";

export {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter
}