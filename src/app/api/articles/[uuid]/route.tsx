import { jsonResponseNotFound } from "@/utils/api/responses/response_error";
import { jsonResponsePost, responseDelete } from "@/utils/api/responses/response_success";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { uuid: string } }) {
    // we get the UUID from the URL params
    const uuid = params.uuid;
  
    if (!uuid) return jsonResponseNotFound("Article not found");

    const article = await prisma.article.findUnique({
        select: {
            uuid: true,
            i18n: {
                select: {
                    title: true,
                    conclusion: true,
                    description: true,
                    content: true,
                    lang: true,
                },
            },
        },
        where: {
            uuid,
        },
    });

    return jsonResponsePost(article);
}

export async function DELETE(_: NextRequest, { params }: { params: { uuid: string } }) {
    // we get the UUID from the URL params
    const uuid = params.uuid;
  
    if (!uuid) return jsonResponseNotFound("Article not found");
  
    const article = await prisma.article.findUnique({
      where: {
        uuid,
      },
    });
  
    if (!article) return jsonResponseNotFound("Article not found");
  
    // TODO setup rights, only admin should be able to delete users
  
    await prisma.article.delete({
      where: {
        uuid,
      },
    });
  
    return responseDelete();
  }