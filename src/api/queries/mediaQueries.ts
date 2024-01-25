import { api } from "../_config";
import type { FileTypeStore } from "@/contexts/store_files_context";
import type { Media } from "@prisma/client";

export async function getMediaQuery() {
  const result = await api.get<Omit<Media, "id">[]>("media");
  return result.data;
}

export async function createMediaQuery(filesTypeStore: FileTypeStore[]) {
  const formData = new FormData();

  for (let fileTypeStore of filesTypeStore) {
    formData.append("files[]", fileTypeStore.file);
  }

  const result = await api.post("media", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

export async function deleteMediaQuery(mediaId: Media["uuid"]) {
  const result = await api.delete(`media/${mediaId}`);
  return result.data;
}
