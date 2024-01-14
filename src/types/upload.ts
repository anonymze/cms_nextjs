import { FileSchema } from "@/utils/api/file_resolving";
import { z } from "zod";

// Zod schema
export type UploadZodType = z.infer<typeof uploadSchema>;

export const uploadSchema = z.object({
  files: z.array(FileSchema),
});