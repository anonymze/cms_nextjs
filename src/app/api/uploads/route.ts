import { createPostResponseApi, logicPostResponse } from "@/utils/response_API";

export async function GET(request: Request) {
  return Response.json('GET UPLOADS !!!!');
}

export async function POST(request: Request) {
  return await logicPostResponse(request, createPostResponseApi, parserPostDataUpload);
}

function parserPostDataUpload(data: unknown): Error | void {
  // TODO ZOD verification
}

