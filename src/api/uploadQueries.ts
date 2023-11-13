import type { FileTypeStore } from "@/contexts/store_files_context";
import { api } from "./_config";
import type { Upload } from "@/types/upload";

export async function getUploadsQuery() {
  const result = await api.get<Upload[]>("uploads");
  return result.data;
}

export async function createUploadQuery(filesTypeStore: FileTypeStore[]) {
  const formData = new FormData();

  for (let fileTypeStore of filesTypeStore) {
    formData.append("files[]", fileTypeStore.file);
  }

  const result = await api.post("uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

export async function deleteUploadQuery(uploadId: Upload["uuid"]) {
  const result = await api.delete(`uploads/${uploadId}`);
  return result.data;
}