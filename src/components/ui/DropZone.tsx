import { useEffect, useRef, type PropsWithChildren, type DragEvent } from "react"
import { Button } from "./Button"
import { convertFileToBaseType } from "@/utils/file";

const DropZone: React.FC<PropsWithChildren> = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    const inputElem = inputRef.current;    

    inputElem.addEventListener("change", handleFileUpload);

    return () => {
        inputElem.removeEventListener("change", handleFileUpload)
    }
  }, [inputRef])

  return (
    <div onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}  className="grid items-center h-full py-8 text-center rounded-md border-[1px] border-dashed hover:border-white">
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
            <input hidden ref={inputRef} type="file" />
        </p>
    </div>
  )
}

async function handleFileUpload(this: HTMLInputElement) {
  const file = this.files?.[0];
  if (!file) return;

  const base64File = await convertFileToBaseType(file, "base64");

  console.log(base64File);
}

async function handleFileDrop(ev: DragEvent<HTMLDivElement>) {
  // prevent behavior of opening the file in the browser
  ev.preventDefault();

  const file = ev.dataTransfer?.files?.[0];
  if (!file) return;

  const base64File = await convertFileToBaseType(file, "base64");

  console.log(base64File);
}

export default DropZone