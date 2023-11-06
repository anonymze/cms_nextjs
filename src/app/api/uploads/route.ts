import { uploadSchema } from "@/types/upload";
import { manageFiles } from "@/utils/api/file_resolving";
import { parserRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import { PrismaClient } from '@prisma/client'

export const prismaClient = new PrismaClient();

const ACCEPTED_CONTENT_TYPE = 'multipart/form-data';

export async function GET() {
  return jsonResponsePost(await (new PrismaClient()).upload.findMany());
}

export async function POST(req: Request) {
  const { error: errorContentType, messageError: messageErrorContentType, contentType} = parserRequest.validContentType(req.headers, ACCEPTED_CONTENT_TYPE);

  if (errorContentType) {
    return jsonResponseBadRequest(messageErrorContentType);
  }

  const { error: errorParsing, messageError: messageErrorParsing, dataParsed } = await parserRequest.parseBody(req, contentType);

  if (errorParsing) {
    return jsonResponseBadRequest(messageErrorParsing);
  }

  const {error: errorVerification, messageError: messageErrorVerification, dataVerified} = parserRequest.validData(dataParsed, contentType, uploadSchema);   
    
  if (errorVerification) {
    return jsonResponseBadRequest(messageErrorVerification);
  }

  const { error: errorFile, filesEntity } = await manageFiles(dataVerified);

  if (errorFile) {
    return jsonResponseBadRequest("Le fichier n'a pas pu être créé");
  }

  return jsonResponsePost(filesEntity);
}



