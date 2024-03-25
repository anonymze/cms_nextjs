import { api } from "../_config";
import type { Media_Details } from "@prisma/client";
import type { createMediaDetailsSchema, updateMediaDetailsSchema } from "@/types/media_details";
import type { z } from "zod";

export async function getMediaDetailsQuery() {
	const result = await api.get<Omit<Media_Details, "id">[]>("media-details");
	return result.data;
}

export async function createMediaDetailsQuery(
  mediaDetails: z.infer<typeof createMediaDetailsSchema>
) {
  const result = await api.post("media-details", mediaDetails);
  return result.data;
}

export async function deleteMediaDetailsQuery(mediaDetailId: Media_Details["uuid"]) {
  const result = await api.delete(`media-details/${mediaDetailId}`);
  return result.data;
}

export async function updateMediaDetailsQuery(
  mediaDetails: { uuid: Media_Details["uuid"] } & z.infer<typeof updateMediaDetailsSchema>
) {
  const { uuid, ...data } = mediaDetails;
  const result = await api.patch(`media-details/${uuid}`, data);
  return result.data;
}
