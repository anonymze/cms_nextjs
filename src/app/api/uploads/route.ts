import { uploadSchema } from "@/types/upload";
import { manageFiles } from "@/utils/api/file_resolving";
import { processRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "multipart/form-data";

export async function GET() {
  return jsonResponsePost(
    await prisma.upload.findMany({
      select: {
        uuid: true,
        filepath_public: true,
        filetype: true,
      }
    }),
  );
}

export async function POST(req: NextRequest) {
  const { error, messageError, data } = await processRequest(req, ACCEPTED_CONTENT_TYPE, uploadSchema);

  if (error) return jsonResponseBadRequest(messageError);

  const { error: errorFile, filesEntity } = await manageFiles(data.files);

  if (errorFile) return jsonResponseBadRequest("Un des fichiers n'a pas pu être créé");

  return jsonResponsePost(filesEntity);
}
