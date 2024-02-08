import { FileSchema } from "@/utils/server_api/file_resolving";
import { z } from "zod";

// Zod schema
export type MediaZopType = z.infer<typeof mediaSchema>;

export const mediaSchema = z.object({
	files: z.array(FileSchema),
});
