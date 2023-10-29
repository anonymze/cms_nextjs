import { MAX_FILE_SIZE, isValidFileType } from "@/utils/file_resolving";
import { z } from "zod";

// TS type
export type Upload = {
    readonly id: string,
    filepath: string,
    filetype: string,
}

// Zod schema
export const uploadSchema: z.ZodType<{ file: File }> = z.object({
    file: z.custom<File>()
    .refine((file: File) => file.size < MAX_FILE_SIZE, "Taille maximum 5mo")
    .refine((file: File) => isValidFileType(file), "Type de fichier non supporté")    
});