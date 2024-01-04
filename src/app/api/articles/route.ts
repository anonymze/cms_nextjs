import { articleSchema } from "@/types/article";
import { processRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import prisma, { getSelectObject } from "@/utils/libs/prisma/select_object";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET() {
  return jsonResponsePost(await prisma.article.findMany({
    // we take everything except the id
    select: getSelectObject(['uuid', 'title', 'content', 'description', 'conclusion', 'createdAt'])
  }));
}

export async function POST(req: NextRequest) {
  const { error, messageError, data } = await processRequest(req, ACCEPTED_CONTENT_TYPE, articleSchema);

  if (error) return jsonResponseBadRequest(messageError);

  const article = await prisma.article.create({
    data
  });

  return jsonResponsePost(article);
}