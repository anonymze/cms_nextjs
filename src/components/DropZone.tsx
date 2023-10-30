"use client"

import { useRef, type ChangeEvent, useState } from "react";
import { Button } from "./ui/Button"
import ImageOperation from "./ImageOperation";
import { type PropsWithChildren, type DragEvent} from "react"

const DropZone: React.FC<PropsWithChildren> = () => {
  const [files, setFiles] = useState<File[]>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async(ev: ChangeEvent<HTMLInputElement>) => {
    const fileList = ev.currentTarget.files;
    if (!fileList) return;

    setFiles(Array.from(fileList)); 
  }
  
  const handleFileDrop = async (ev: DragEvent<HTMLDivElement>) => {
    // prevent behavior of opening the file in the browser
    ev.preventDefault();
  
    const fileList = ev.dataTransfer.files;
    setFiles(Array.from(fileList)); 
  }
  
  return (
      <div onDrop={handleFileDrop} onDragOver={(ev) => ev.preventDefault()}  className="grid items-center h-full py-14 text-center rounded-md border-[1px] border-dashed">
          {!files ? <p>
              Déposer un fichier
              <br/>
              ou
              <br/>
              <Button 
                  onClick={() => inputRef.current?.click()}
                  className="mt-1" 
                  aria-label="Bouton utilisé pour ajouter un fichier local"
              >Cliquer ici pour sélectionner un fichier</Button>
              <input hidden onChange={handleFileUpload} ref={inputRef} name="file" type="file" multiple />
          </p> : files.map((file, idx) => <ImageOperation key={idx} file={file} />)}
      </div>
   )
}

export default DropZone