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