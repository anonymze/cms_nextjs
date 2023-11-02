"use client"

import { Button } from "@/components/ui/Button";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@/components/Dialog"
import { PlusCircleIcon } from "lucide-react";
import { useRef, type PropsWithChildren, type FormEvent } from "react"
import DropZone from "@/components/DropZone";

const ContentMedia: React.FC<PropsWithChildren> = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  return (
      <>
        <Dialog onSubmitForm={sendFilesToApi} ref={dialogRef}>
          <DialogHeader title="Ajouter un média" />
          <DialogBody>
            <DropZone />
          </DialogBody>
          <DialogFooter>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </Dialog>
        <Button large onClick={() => dialogRef.current?.show()}><PlusCircleIcon className="h-6 w-6 mr-2" /> Ajouter votre premier média</Button>
      </>
  )
}

const sendFilesToApi = (ev: FormEvent<HTMLFormElement>) => {
  // prevent button with role cancel any action
  if ((ev.nativeEvent as SubmitEvent)?.submitter?.role === "cancel") return;

  const formData =  new FormData(ev.currentTarget);

  fetch("/api/uploads", {
    method: "POST",
    body: formData
  })
};

export default ContentMedia