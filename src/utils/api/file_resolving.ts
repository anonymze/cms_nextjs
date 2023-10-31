import fs from "fs";

const FOLDER_UPLOADS = "uploads";  

type ManagedFile = 
    | { error: false, filepathPublic: string, filetype: string } 
    | { error: true };

export async function manageFile(file: File)  {
    // TODO: generate unique hash
    const hash = getUniqueHash();
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
    return 'oki';
}

const getExtensionFile = (filetype: File["type"]) => {
    return filetype.split("/")[1];
}