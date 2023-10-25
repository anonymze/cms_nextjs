import { useEffect, useRef, type PropsWithChildren, type DragEvent } from "react"
import { Button } from "./Button"

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
    <div onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}  className="grid items-center h-full py-8 text-center rounded-md border-[1px] border-dashed">
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

  sendFileToServer(file);
}

async function handleFileDrop(ev: DragEvent<HTMLDivElement>) {
  // prevent behavior of opening the file in the browser
  ev.preventDefault();

  const file = ev.dataTransfer?.files?.[0];
  if (!file) return;

  sendFileToServer(file);
}

const sendFileToServer =(file: File) => {
  const formData =  new FormData();
  formData.append("file", file);

  fetch("/api/uploads", {
    method: "POST",
    body: formData
  })
};

export default DropZone