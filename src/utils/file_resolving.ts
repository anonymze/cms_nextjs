import type { Upload } from "@/types/upload";
import fs from "fs";

export const MAX_FILE_SIZE = 5_000_000; // 5mb
const TYPE_FILES_ACCEPTED = ["image/jpeg", "image/jpg"]; 
const FOLDER_BASE = process.cwd();
const FOLDER_UPLOADS = "public/uploads";  

export function isValidFileType(file: File) {
    return TYPE_FILES_ACCEPTED.includes(file.type);
}

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

export async function manageFile(file: File): Omit<Upload, "id"> & { error: boolean } {
    const uniqueHash = 'fiherifg';
    try {   
        const writeStream = fs.createWriteStream(`${FOLDER_BASE}/${FOLDER_UPLOADS}/${uniqueHash}.${getExtensionFile(file.type)}`);
        writeStream.write(file);
        writeStream.end();
    } catch(err) {

    }
}

const getUniqueHash = () => {
}

const getExtensionFile = (filetype: File["type"]) => {
    return filetype.split("/")[1];
}