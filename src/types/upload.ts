import { FileSchema } from "@/utils/api/file_resolving";
import { z } from "zod";

// TS type
export type Upload = {
  readonly id: number;
  readonly uuid: string;
  filepath_public: string;
  filetype: string;
};

// Zod schema
export type UploadZodType = z.infer<typeof uploadSchema>;

export const uploadSchema = z.object({
  files: z.array(FileSchema),
});
