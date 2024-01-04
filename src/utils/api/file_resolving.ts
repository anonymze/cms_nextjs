import fs from "fs";
import prisma from "../libs/prisma/select_object";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { MAX_FILE_SIZE, isValidFileType } from "../file_resolving";
import path from "path";
import type { Upload } from "@/types/upload";

const FOLDER_UPLOADS = "uploads";

export const FileSchema = z
  .custom<File>()
  .refine(
    (file) => {
      return file.size < MAX_FILE_SIZE;
    },
    { message: "Le fichier est trop volumineux" },
  )
  .refine(
    (file) => {
      return isValidFileType(file);
    },
    { message: "Le type de fichier n'est pas valide" },
  );

type ManagedFiles = { error: false; filesEntity: Upload[] } | { error: true };

export async function manageFiles(files: File[]) {
  try {
    const uploadedFiles = [];

    for await (let file of files) {
      const createdFile = await createFileLocally(file);
      const uploadedFile = await prisma.upload.create({
        data: {
          filepath_public: createdFile.filepathPublic,
          filetype: createdFile.filetype,
        },
      });

      uploadedFiles.push(uploadedFile);
    }

    return { error: false, filesEntity: uploadedFiles } satisfies ManagedFiles;
  } catch (err) {
    return { error: true } satisfies ManagedFiles;
  }
}

const createFileLocally = async (file: File) => {
  // unique hash for the name of the file
  const hash = uuidv4();
  const fileExtension = getFileExtension(file.type);
  const filePath = `${path.join('/', FOLDER_UPLOADS, hash)}.${fileExtension}`

  // Uint8Array or Buffer is accepted
  // we save the file in the public folder
  fs.appendFileSync(path.join('public', filePath), Buffer.from(await file.arrayBuffer()));

  return { filepathPublic: filePath, filetype: file.type };
};

const getFileExtension = (filetype: File["type"]) => {
  return filetype.split("/")[1];
};
