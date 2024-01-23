import { useRef, useCallback, useState } from "react";
import { Button } from "./ui/Button";
import MediaOperation from "./MediaOperation/MediaOperation";
import { useFilesStore } from "@/contexts/store_files_context";
import { TYPE_FILES_ACCEPTED, convertFileToBaseType } from "@/utils/file_resolving";
import { type PropsWithChildren, type DragEvent, type ChangeEvent } from "react";
import { set } from "zod";
import { CloudLightningIcon, DropletIcon } from "lucide-react";

export default function DropZone() {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // files from context
  const files = useFilesStore((state) => state.files);
  const setFiles = useFilesStore((state) => state.setFiles);
  const removeFile = useFilesStore((state) => state.removeFile);

  const handleFiles = useCallback(
    async (ev: React.ChangeEvent<HTMLInputElement> | React.DragEvent, type: "drop" | "upload") => {
      let fileList: FileList | null;

      switch (type) {
        case "drop":
          ev.preventDefault();
          const eventDrag = ev as DragEvent<HTMLInputElement>;
          fileList = eventDrag.dataTransfer.files;
          // prevent default to avoid opening the file in the browser
          break;
        case "upload":
          const eventChange = ev as ChangeEvent<HTMLInputElement>;
          // we use structuredClone to avoid reference
          fileList = structuredClone(eventChange.currentTarget.files);
          // we reset the input value to be able to upload the same file if necessary
          eventChange.currentTarget.value = "";
          break;
        default:
          return;
      }

      if (!fileList || fileList.length === 0) return;

      let setupFiles = [];

      for await (let file of fileList) {
        setupFiles.push({
          file,
          base64: await convertFileToBaseType<string>(file, "base64"),
        });
      }

      setFiles(setupFiles);
    },
    [setFiles],
  );

  return (
    <>
      {files.length <= 0 ? (
        <div
          onDrop={async (ev) => {
            ev.preventDefault();
            await handleFiles(ev, "drop");
            setIsDraggedOver(false);
          }}
          // prevent default to avoid opening the file in the browser
          onDragOver={(ev) => {
            ev.preventDefault();
            setIsDraggedOver(true);
          }}
          onDragLeave={(ev) => {
            // Ignore event if we're entering a child element
            if (ev.currentTarget.contains(ev.relatedTarget as Node)) return;
            setIsDraggedOver(false);
          }}
          className="grid items-center h-48 text-center rounded-md border-[1px] border-dashed"
        >
          {isDraggedOver ? (
            <CloudLightningIcon className="w-12 h-12 mx-auto" />
          ) : (
            <p>
              Déposer un fichier
              <br />
              ou
              <br />
              <Button
                onClick={() => inputRef.current?.click()}
                type="button"
                className="mt-1"
                aria-label="Bouton utilisé pour ajouter un fichier local"
              >
                Cliquer ici pour sélectionner un fichier
              </Button>
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 min-h-48">
          {files.map((fileTypeStore, idx) => (
            <MediaOperation
              removeFileFromApi={false}
              key={idx}
              onClick={() => removeFile(fileTypeStore.file)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fileTypeStore.base64} alt="" />
            </MediaOperation>
          ))}
        </div>
      )}
      {/* we need to put input outside of the logic to access it all the time */}
      <input
        onChange={(ev) => handleFiles(ev, "upload")}
        ref={inputRef}
        name="file"
        type="file"
        accept={TYPE_FILES_ACCEPTED.join(",")}
        hidden
        multiple
        formNoValidate
      />
    </>
  );
}
