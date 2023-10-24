import type { JsonResponse } from "@/types/response";

export function jsonResponse({body, status, statusText, headers}: JsonResponse) {
    if (typeof body === 'string') return Response.json({ status, message: body}, { status, statusText, headers });
    return Response.json(body, { status, statusText, headers });
}
