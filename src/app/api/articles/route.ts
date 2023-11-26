import { articleSchema } from "@/types/article";
import { parserRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import prisma from "@/utils/libs/prisma";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET() {
  return jsonResponsePost(await prisma.upload.findMany());
}

export async function POST(req: Request) {
  const {
    error: errorContentType,
    messageError: messageErrorContentType,
    contentType,
  } = parserRequest.validContentType(req.headers, ACCEPTED_CONTENT_TYPE);

  if (errorContentType) return jsonResponseBadRequest(messageErrorContentType);

  const {
    error: errorParsing,
    messageError: messageErrorParsing,
    dataParsed,
  } = await parserRequest.parseBody(req, contentType);

  if (errorParsing) return jsonResponseBadRequest(messageErrorParsing);

  const {
    error: errorVerification,
    messageError: messageErrorVerification,
    dataVerified,
  } = parserRequest.validData(dataParsed, contentType, articleSchema);

  if (errorVerification) return jsonResponseBadRequest(messageErrorVerification);

  const article = await prisma.article.create({
    data: dataVerified
  });


  return jsonResponsePost(article);
}
