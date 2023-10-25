import { uploadSchema } from "@/types/upload";
import { parserRequest } from "@/utils/responses/response";
import { jsonResponseBadRequest } from "@/utils/responses/response_error";
import { jsonResponsePost } from "@/utils/responses/response_success";
import type { NextRequest } from "next/server";


const ACCEPTED_CONTENT_TYPE = 'multipart/form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req: Request) {
  return Response.json('GET UPLOADS !!!!');
}

export async function POST(req: NextRequest) {
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

  return jsonResponsePost(dataVerified);
}


