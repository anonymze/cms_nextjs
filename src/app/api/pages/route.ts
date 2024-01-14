import { I18n } from "@/types/i18n";
import { formCreatePageSchema } from "@/types/page";
import { processRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import { getSelectObject } from "@/utils/libs/prisma/select_object";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET() {
  return jsonResponsePost(
    await prisma.page.findMany({
      select: getSelectObject(["uuid", "title", "subtitle", "description", "createdAt"]),
    }),
  );
}

export async function POST(req: NextRequest) {
  const { error, messageError, data } = await processRequest(
    req,
    ACCEPTED_CONTENT_TYPE,
    formCreatePageSchema,
  );

  if (error) return jsonResponseBadRequest(messageError);

  const page = await prisma.page.create({
    data: {
      i18n: {
        create: {
          description: data.description,
          subtitle: data.subtitle,
          title: data.title,
          lang: data.lang || I18n.DEFAULT,
        },
      },
    },
  });

  return jsonResponsePost(page);
}
