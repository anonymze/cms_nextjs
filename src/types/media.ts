import { FileSchema } from "@/utils/server_api/file_resolving";
import { z } from "zod";

export const mediaSchema = z.object({
	files: z.array(FileSchema),
});
