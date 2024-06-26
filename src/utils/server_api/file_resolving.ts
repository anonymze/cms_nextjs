import fs from "fs";
import { z } from "zod";
import { MAX_FILE_SIZE, isValidFileType } from "../web_api/file_resolving";
import path from "path";
import prisma from "../libs/prisma/single_instance";
import { randomUUID } from "crypto";
import type { Media } from "@prisma/client";

const FOLDER_MEDIA = "media";

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

type ManagedFiles = { error: false; filesEntity: Media[] } | { error: true };

/**
 * 
 * @description manage files given, create them locally and in the database
 */
export async function manageFiles(files: File[]) {
	try {
		const mediaFiles = new Array();

		for await (const file of files) {
			const createdFile = await createFileLocally(file);
			const mediaFile = await prisma.media.create({
				data: {
					filepath_public: createdFile.filepathPublic,
					filetype: createdFile.filetype,
				},
			});

			mediaFiles.push(mediaFile);
		}

		return { error: false, filesEntity: mediaFiles } satisfies ManagedFiles;
	} catch (err) {
		return { error: true } satisfies ManagedFiles;
	}
}

/**
 * 
 * @description create a file locally in the public folder
 */
const createFileLocally = async (file: File) => {
	// unique hash for the name of the file
	const hash = randomUUID();
	const repertoryMedia = path.join("public", FOLDER_MEDIA);
	const fileExtension = getFileExtension(file.type);
	// slash is needed at the start for nextjs images
	const filePath = `${path.join("/", FOLDER_MEDIA, hash)}.${fileExtension}`;

	// create repertories if not exist
	if (!fs.existsSync(repertoryMedia)) {
		fs.mkdirSync(repertoryMedia, { recursive: true });
	}

	// Uint8Array or Buffer is accepted
	// we save the file in the public folder
	fs.appendFileSync(path.join("public", filePath), Buffer.from(await file.arrayBuffer()));

	return { filepathPublic: filePath, filetype: file.type };
};

const getFileExtension = (filetype: File["type"]) => {
	return filetype.split("/")[1];
};
