import { uploadSchema } from "@/types/upload";
import { manageFile } from "@/utils/api/file_resolving";
import { parserRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient();

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

  const { error: errorFile, filepathPublic, filetype } = await manageFile(dataVerified.file);

  if (errorFile) {
    return jsonResponseBadRequest("Le fichier n'a pas pu être créé");
  }

  const upload = await prismaClient.upload.create({
    data: {
      filepath_public: filepathPublic,
      filetype: filetype,
    },
  })

  return jsonResponsePost({ id: upload.uuid, filetype });
}



