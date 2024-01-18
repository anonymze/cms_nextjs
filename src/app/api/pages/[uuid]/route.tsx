import { jsonResponseNotFound } from "@/utils/api/responses/response_error";
import { jsonResponsePost, responseDelete } from "@/utils/api/responses/response_success";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { uuid: string } }) {
    // we get the UUID from the URL params
    const uuid = params.uuid;
  
    if (!uuid) return jsonResponseNotFound("Page not found");

    const page = await prisma.page.findUnique({
        select: {
            uuid: true,
            i18n: {
                select: {
                    title: true,
                    description: true,
                    subtitle: true,
                    lang: true,
                },
            },
        },
        where: {
            uuid,
        },
    });

    return jsonResponsePost(page);
}

export async function DELETE(_: NextRequest, { params }: { params: { uuid: string } }) {
    // we get the UUID from the URL params
    const uuid = params.uuid;
  
    if (!uuid) return jsonResponseNotFound("Page not found");
  
    const page = await prisma.page.findUnique({
      where: {
        uuid,
      },
    });
  
    if (!page) return jsonResponseNotFound("Page not found");
  
    // TODO setup rights, only admin should be able to delete users
  
    await prisma.page.delete({
      where: {
        uuid,
      },
    });
  
    return responseDelete();
  }