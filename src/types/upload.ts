import { isValidFileType } from "@/utils/file_resolving";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;

export type Upload = {
    readonly id: string,
    file: File,
}

export const uploadSchema: z.ZodType<Omit<Upload, 'id'>> = z.object({
    file: z.custom<File>()
    .refine((file: File) => file.size < MAX_FILE_SIZE, "Taille maximum 5mo")
    .refine((file: File) => isValidFileType(file), "Type de fichier non supporté")    
});