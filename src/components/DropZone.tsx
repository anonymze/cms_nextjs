import { useRef, useCallback, type ChangeEventHandler } from "react";
import { Button } from "./ui/Button"
import MediaOperation from "./MediaOperation/MediaOperation";
import { useFilesStore } from "@/contexts/store_files_context";
import { TYPE_FILES_ACCEPTED, convertFileToBaseType } from "@/utils/file_resolving";
import { type PropsWithChildren, type DragEvent, type ChangeEvent} from "react"

const DropZone: React.FC<PropsWithChildren> = () => {
  // files from context
  const files = useFilesStore((state) => state.files);
  const setFiles = useFilesStore((state) => state.setFiles);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async(ev: React.SyntheticEvent, type: "drop" | "upload") => {
    let fileList: FileList | null;
  
    switch(type) {
      case "drop":
        fileList = (ev as DragEvent).dataTransfer.files;
        break;
      case "upload":
        fileList = (ev as ChangeEvent<HTMLInputElement>).currentTarget.files;
        break;
      default:
        return;
    }
  
    if (!fileList || fileList.length === 0) return;   
  
    let setupFiles = [];
  
    for await (let file of fileList) {
      setupFiles.push({
        file,
        base64: await convertFileToBaseType<string>(file, "base64")
      })
    }
  
    setFiles(setupFiles);
  }, [setFiles]);
  
  return (
    <>
    {files.length < 1 ? (<div onDrop={(ev) => handleFiles(ev, "drop")} onDragOver={(ev) => ev.preventDefault()}  className="grid items-center h-full py-14 text-center rounded-md border-[1px] border-dashed">
          <p>
              Déposer un fichier
              <br/>
              ou
              <br/>
              <Button 
                  onClick={() => inputRef.current?.click()}
                  type="button"
                  className="mt-1" 
                  aria-label="Bouton utilisé pour ajouter un fichier local"
              >Cliquer ici pour sélectionner un fichier</Button>
          </p> 
      </div>)
      : (
        <div className="flex flex-wrap gap-4">
          {files.map((fileTypeStore, idx) => (<MediaOperation key={idx} fileTypeStore={fileTypeStore} />
          )
          )}
          </div>
      )
      }
    {/* we need to put input outside of the logic to access it all the time */}
    <input hidden onChange={(ev) => handleFiles(ev, "upload")} ref={inputRef} name="file" type="file" accept={TYPE_FILES_ACCEPTED.join(',')} multiple formNoValidate />
          </>
  )
}



export default DropZone