import  React from "react"
import { cn } from "@/utils/libs/utils"
import { X } from "lucide-react";
import { SeparatorHorizontal } from "./ui/Separator"
import { Button } from "./ui/Button";

import type { PropsWithChildren } from "react"

export interface DialogProps
  extends React.DialogHTMLAttributes<HTMLDialogElement> {
    onSubmitForm?: (ev: React.FormEvent<HTMLFormElement>) => void;
  }

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
    ({ children, className, onSubmitForm, ...props }, ref) => {

      return (
        <dialog className={cn("fixed block left-1/2 top-1/2 w-[65vh] p-4",
        "translate-x-[-50%] translate-y-[-40%]",
         "bg-popover text-popover-foreground rounded-md border-[1px]",
         "opacity-0 invisible transition-fade open:opacity-100 open:translate-y-[-50%] open:visible"
         , className)} {...props} ref={ref}>
            <form onSubmit={onSubmitForm} className="flex flex-col h-full" method="dialog" noValidate>
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
                <Button outline={false} fill={false} type="submit" aria-label="close" autoFocus formNoValidate><X className="w-5 h-5 cursor-pointer" /></Button>
            </div>
            <SeparatorHorizontal />
        </>
    )
}

const DialogBody: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex-1 py-4">
            { children }
        </div>
    )
}

const DialogFooter: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="flex items-center gap-2 [&>button:first-of-type]:ml-auto">
            <Button type="submit" fill={false} aria-label="close" formNoValidate>Annuler</Button>
            {children}
        </div>
    )
}

export {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter
}