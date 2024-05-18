interface JsonResponseCore {
	status: number;
	statusText: string;
	headers?: HeadersInit;
}

interface JsonResponse extends JsonResponseCore {
	body: unknown;
}

export function jsonResponse({ body, status, statusText, headers }: JsonResponse) {
	// in case there is a mistake we handle no content
	if (status === 204) {
		return new Response(null, { status, statusText, headers });
	}

	if (!body || typeof body === "string") {
		return Response.json({ status, message: body || "OK" }, { status, statusText, headers });
	}

	return Response.json(body, { status, statusText, headers });
}