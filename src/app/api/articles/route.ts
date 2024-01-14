import { articleSchema } from "@/types/article";
import { I18n } from "@/types/i18n";
import { processRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET() {
  return jsonResponsePost(
    await prisma.article.findMany({
      where: {
        i18n: {
          some: {
            // TODO we will get locale from the request
            lang: I18n.DEFAULT,
          },
        },
      },
    }),
  );
}

export async function POST(req: NextRequest) {
  const { error, messageError, data } = await processRequest(
    req,
    ACCEPTED_CONTENT_TYPE,
    articleSchema,
  );

  if (error) return jsonResponseBadRequest(messageError);

  const article = await prisma.article.create({
    data: {
      i18n: {
        create: {
          content: data.content,
          conclusion: data.conclusion,
          description: data.description,
          title: data.title,
          lang: data.lang || I18n.DEFAULT,
        },
      },
    },
  });

  return jsonResponsePost(article);
}
