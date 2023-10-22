import { useEffect, useRef, type PropsWithChildren } from "react"
import { Button } from "./Button"

function handleFileUpload(this: HTMLInputElement | HTMLElement) {
    console.log('iciii');
    console.log(this);
    if (this instanceof HTMLInputElement) {
        console.log(this.files?.[0]);
        return;
    }

    // si c'est une instance hors input, c'est que c'est un drop de fichier
    if (this instanceof HTMLElement) {
        console.log(this);
        return;
    }
}

const DragAndDrop: React.FC<PropsWithChildren> = () => {
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
    <div onDrop={(e) => {
        console.log(e.dataTransfer.files[0]);
        e.preventDefault();
    }} onDragOverCapture={(e) => e.preventDefault()} className="grid items-center h-full py-8 text-center rounded-md border-[1px] border-dashed hover:border-white">
        <p>
            Déposer un fichier
            <br/>
            ou
            <br/>
            <Button 
                onClick={() => inputRef.current?.click()}
                className="mt-2" 
                aria-label="Bouton utilisé pour ajouter un fichier local"
            >Cliquer ici pour sélectionner un fichier</Button>
            <input hidden ref={inputRef} type="file" />
        </p>
    </div>
  )
}

export default DragAndDrop