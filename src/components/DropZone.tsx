"use client"

import { useRef, type ChangeEvent, useState, useCallback } from "react";
import { Button } from "./ui/Button"
import MediaOperation from "./MediaOperation/MediaOperation";
import { type PropsWithChildren, type DragEvent} from "react"
import { convertFileToBaseType } from "@/utils/file_resolving";

const DropZone: React.FC<PropsWithChildren> = () => {
  const [files, setFiles] = useState<string[]>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFilesUpload = useCallback(async(ev: ChangeEvent<HTMLInputElement>) => {
    const fileList = ev.currentTarget.files;
    if (!fileList) return;    

    setFiles(await getBase64FromFileList(fileList)); 
  }, [])
  
  const handleFilesDrop = useCallback(async (ev: DragEvent<HTMLDivElement>) => {
    // prevent behavior of opening the file in the browser
    ev.preventDefault();
  
    const fileList = ev.dataTransfer.files;    
    setFiles(await getBase64FromFileList(fileList)); 
  }, [])
  
  return (
    <>
    {!files ? (<div onDrop={handleFilesDrop} onDragOver={(ev) => ev.preventDefault()}  className="grid items-center h-full py-14 text-center rounded-md border-[1px] border-dashed">
          <p>
              Déposer un fichier
              <br/>
              ou
              <br/>
              <Button 
                  onClick={() => inputRef.current?.click()}
                  className="mt-1" 
                  aria-label="Bouton utilisé pour ajouter un fichier local"
              >Cliquer ici pour sélectionner un fichier</Button>
              <input hidden onChange={handleFilesUpload} ref={inputRef} name="file" type="file" multiple />
          </p> 
      </div>)
      : (
        <div className="flex flex-wrap gap-4">
          {files.map((base64, idx) => (<MediaOperation key={idx} base64={base64} />
          )
          )}
          </div>
      )
      }

          </>
  )
}
   
const  getBase64FromFileList = async(fileList: FileList) => {
  let files = []

  for await (let file of fileList) {
    files.push(await convertFileToBaseType<string>(file, "base64"))
  }

  return files;
}

export default DropZone