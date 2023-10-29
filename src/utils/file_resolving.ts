import fs from "fs";

const FOLDER_UPLOADS = "uploads";  
const TYPE_FILES_ACCEPTED = ["image/jpeg", "image/jpg"]; 
export const MAX_FILE_SIZE = 5_000_000; // 5mb

export function isValidFileType(file: File) {
    return TYPE_FILES_ACCEPTED.includes(file.type);
}

// TODO typing match type
export function convertFileToBaseType<T = string | ArrayBuffer>(file: File, type: "binary" | "base64" | "arrayBuffer"): Promise<T> {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onload = () => {
            resolve(fileReader.result as T);
        };

        fileReader.onerror = reject;
        
        if (type === "base64" || type === "binary") {
            fileReader.readAsDataURL(file);
            return;
        }

        if (type === "arrayBuffer") {
            fileReader.readAsArrayBuffer(file);
            return;
        }
    });
}

type ManagedFile = 
    | { error: false, filepathPublic: string, filetype: string } 
    | { error: true };

export async function manageFile(file: File)  {
    // TODO: generate unique hash
    const hash = 'oki'
    const fileExtension = getExtensionFile(file.type);
    const filepathPublic = `${FOLDER_UPLOADS}/${hash}.${fileExtension}`;

    try {   
        // Uint8Array or Buffer is accepted
        fs.appendFileSync(`public/${filepathPublic}`, Buffer.from(await file.arrayBuffer()));

        return { error: false, filepathPublic: filepathPublic, filetype: file.type} satisfies ManagedFile;
    } catch(err) {
        return { error: true } satisfies ManagedFile;
    }
}

const getUniqueHash = () => {
}

const getExtensionFile = (filetype: File["type"]) => {
    return filetype.split("/")[1];
}