"use client"

import { Button } from "@/components/ui/Button";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog"
import { PlusCircleIcon } from "lucide-react";
import { useRef, type PropsWithChildren } from "react"

const ContentMedia: React.FC<PropsWithChildren> = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  return (
    <>
      <Dialog ref={dialogRef}>
        <DialogHeader title="Ajouter un média" />
        <DialogBody />
        <DialogFooter>
          <Button type="submit" onClick={(e) => {
                e.preventDefault();
            }}>Enregistrer</Button>
        </DialogFooter>
      </Dialog>
      <Button large={true} onClick={() => dialogRef.current?.show()}><PlusCircleIcon className="h-6 w-6 mr-2" /> Ajouter un média</Button>
    </>

  )
}

export default ContentMedia