export const TYPE_FILES_ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
export const MAX_FILE_SIZE = 5_000_000; // 5mb

export function isValidFileType(file: File) {
	return TYPE_FILES_ACCEPTED.includes(file.type);
}

// TODO T should match typing type
/**
 * 
 * @description convert a file to a defined type (binary, base64, arrayBuffer)
 */
export async function convertFileToBaseType<T = string | ArrayBuffer>(
	file: File,
	type: "binary" | "base64" | "arrayBuffer",
): Promise<T> {
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
