import { pageSchema } from "@/types/page";
import { processRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import prisma, { getSelectObject } from "@/utils/libs/prisma/select_object";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET() {
  return jsonResponsePost(await prisma.page.findMany({
    select: getSelectObject(['uuid', 'title', 'subtitle', 'description', 'createdAt'])
  }));
}

export async function POST(req: NextRequest) {
    const { error, messageError, data } = await processRequest(req, ACCEPTED_CONTENT_TYPE, pageSchema);

    if (error) return jsonResponseBadRequest(messageError);
  
    const page = await prisma.page.create({
      data
    });
  
    return jsonResponsePost(page);
}
