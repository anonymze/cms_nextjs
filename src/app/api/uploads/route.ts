import { uploadSchema } from "@/types/upload";
import { parserRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import { manageFile } from "@/utils/file_resolving";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const ACCEPTED_CONTENT_TYPE = 'multipart/form-data';

export async function GET(req: Request) {
  return Response.json('GET UPLOADS !!!!');
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

  const { error: errorFile, filepath, filetype } = manageFile(dataVerified.file);

  console.log(filepath, filetype);

  return jsonResponsePost({ filepath, filetype });
}



