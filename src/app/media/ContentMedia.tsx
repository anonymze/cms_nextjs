"use client"

import { Button } from "@/components/ui/Button";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@/components/Dialog"
import { PlusCircleIcon } from "lucide-react";
import { useRef, type PropsWithChildren, type FormEvent } from "react"
import DropZone from "@/components/DropZone";
import { useFilesStore } from "@/contexts/store_files_context";

const ContentMedia: React.FC<PropsWithChildren> = () => {
  // files from context
  const files = useFilesStore((state) => state.files);
  const setFiles = useFilesStore((state) => state.setFiles);
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  return (
      <>
        {/* on close we reset the UI after the transition time */}
        <Dialog onClose={() => setTimeout(() => setFiles([]) , 150)} onSubmitForm={sendFilesToApi} ref={dialogRef}>
          <DialogHeader title="Ajouter un média" />
          <DialogBody>
            <DropZone />
          </DialogBody>
          <DialogFooter>
            {/* if files already there we show the button and onclick we launch the input file */}
            {files.length >= 1 && (<Button type="button" onClick={({target}) => (target as HTMLButtonElement).closest('dialog')?.querySelector('input')?.click()}>Ajouter d&apos;autres médias</Button>)}
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