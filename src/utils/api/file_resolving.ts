import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import prisma from "../libs/prisma";
import type { Upload, UploadZodType } from "@/types/upload";

const FOLDER_UPLOADS = "uploads";

type ManagedFiles = { error: false; filesEntity: Upload[] } | { error: true };

export async function manageFiles(data: UploadZodType | UploadZodType[]) {
  try {
    if (!Array.isArray(data)) {
      const createdFile = await createFileLocally(data);

      const uploadedFile = await prisma.upload.create({
        data: {
          filepath_public: createdFile.filepathPublic,
          filetype: createdFile.filetype,
        },
      });
      return { error: false, filesEntity: [uploadedFile] } satisfies ManagedFiles;
    }

    const uploadedFiles = [];

    for await (let file of data) {
      const createdFile = await createFileLocally(file);

      uploadedFiles.push(
        await prisma.upload.create({
          data: {
            filepath_public: createdFile.filepathPublic,
            filetype: createdFile.filetype,
          },
        }),
      );
    }

    return { error: false, filesEntity: uploadedFiles } satisfies ManagedFiles;
  } catch (err) {
    return { error: true } satisfies ManagedFiles;
  }
}

const createFileLocally = async (file: File) => {
  // unique hash for the name of the file
  const hash = uuidv4();
  const fileExtension = getExtensionFile(file.type);
  const filepathPublic = `/${FOLDER_UPLOADS}/${hash}.${fileExtension}`;

  // Uint8Array or Buffer is accepted
  fs.appendFileSync(`public${filepathPublic}`, Buffer.from(await file.arrayBuffer()));

  return { filepathPublic: filepathPublic, filetype: file.type };
};

const getExtensionFile = (filetype: File["type"]) => {
  return filetype.split("/")[1];
};
