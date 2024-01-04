import { useRef, useCallback } from "react";
import { Button } from "./ui/Button";
import MediaOperation from "./MediaOperation/MediaOperation";
import { useFilesStore } from "@/contexts/store_files_context";
import { TYPE_FILES_ACCEPTED, convertFileToBaseType } from "@/utils/file_resolving";
import { type PropsWithChildren, type DragEvent, type ChangeEvent } from "react";

const DropZone: React.FC<PropsWithChildren> = () => {
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
          const eventDrag = ev as DragEvent<HTMLInputElement>;
          fileList = eventDrag.dataTransfer.files;
          // prevent default to avoid opening the file in the browser
          ev.preventDefault();
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
          onDrop={(ev) => handleFiles(ev, "drop")}
          // prevent default to avoid opening the file in the browser
          onDragOver={(ev) => ev.preventDefault()}
          className="grid items-center h-full py-14 text-center rounded-md border-[1px] border-dashed"
        >
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
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
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
};

export default DropZone;
