import { articleSchema } from "@/types/article";
import { processRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import prisma from "@/utils/libs/prisma";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET() {
  return jsonResponsePost(await prisma.article.findMany());
}

export async function POST(req: Request) {
  const { error, messageError, data } = await processRequest(req, ACCEPTED_CONTENT_TYPE, articleSchema);

  if (error) return jsonResponseBadRequest(messageError);

  const article = await prisma.article.create({
    data
  });

  return jsonResponsePost(article);
}
