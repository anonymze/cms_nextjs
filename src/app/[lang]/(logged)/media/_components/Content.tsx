"use client";

import DropZone from "@/components/ui/DropZone";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/Dialog";
import { PlusCircleIcon } from "lucide-react";
import { useContext, useRef } from "react";
import { useFilesStore } from "@/contexts/store_files_context";
import { useMutation } from "@tanstack/react-query";
import { createMediaQuery } from "@/api/queries/mediaQueries";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import type { FormEvent } from "react";
import { sleep } from "@/utils/helper";

export default function Content({
  hideActionButton,
}: {
  hideActionButton: boolean;
}) {
  // files from context
  const files = useFilesStore((state) => state.files);
  const lang = useContext(LangContext);
  const setFiles = useFilesStore((state) => state.setFiles);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const createMutation = useMutation({
    mutationFn: createMediaQuery,
    mutationKey: ["media"],
    meta: {
      message: "Le média a été ajouté",
    },
  });

  const sendFilesToApi = (ev: FormEvent<HTMLFormElement>) => {
    if ((ev.nativeEvent as SubmitEvent)?.submitter?.title === "cancel") return;
    if (files.length <= 0) return;
    createMutation.mutate(files);
  };

  return (
    <>
      <Dialog
        // on close we reset the UI after the transition time of closing the dialog
        onClose={async () => {
          await sleep(250);
          setFiles([]);
        }}
        onSubmitForm={sendFilesToApi}
        ref={dialogRef}
      >
        <DialogHeader title={i18n[lang]("ADD_MEDIA")} />
        <DialogBody>
          <DropZone />
        </DialogBody>
        <DialogFooter>
          {/* if files already there we show the button and onclick we launch the input file */}
          {files.length >= 1 && (
            <Button
              secondary
              type="button"
              onClick={({ target }) =>
                (target as HTMLButtonElement)
                  .closest("dialog")
                  ?.querySelector("input")
                  ?.click()
              }
            >
              {i18n[lang]("ADD_OTHER_MEDIA")}
            </Button>
          )}
        </DialogFooter>
      </Dialog>
      {!hideActionButton && (
        <Button large onClick={() => dialogRef.current?.show()}>
          <PlusCircleIcon className="h-6 w-6 mr-2" />{" "}
          {i18n[lang]("ADD_FIRST_MEDIA")}
        </Button>
      )}
    </>
  );
}