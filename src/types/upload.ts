import { MAX_FILE_SIZE, isValidFileType } from "@/utils/file_resolving";
import { z } from "zod";

// TS type
export type Upload = {
    readonly id: number,
    readonly uuid: string
    filepath_public: string,
    filetype: string,
}

// Zod schema
export type UploadZodType = z.infer<typeof uploadSchema>;

export const uploadSchema = z.object({
    file: z.custom<File>()
    .refine((file) => file.size < MAX_FILE_SIZE, "Taille maximum 5mo")
    .refine((file) => isValidFileType(file), "Type de fichier non supporté")    
});