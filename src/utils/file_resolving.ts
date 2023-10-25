export const MAX_FILE_SIZE = 5000000;

export function isValidFileType(file: File) {
    if (file?.name) {
        const fileType = file.name.split(".").pop();
        if (fileType === "jpeg" || fileType === "jpg") return true;
    }
    return false;
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