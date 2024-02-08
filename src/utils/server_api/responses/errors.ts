import { jsonResponse } from "./json_response";

export function jsonResponseUnauthorized(message = "Unauthorized") {
	return jsonResponse({ body: message, status: 401, statusText: "Unauthorized" });
}

export function jsonResponseBadRequest(message: string, statusText = "Bad Request") {
	return jsonResponse({ body: message, status: 400, statusText });
}

export function jsonResponseNotFound(message: string, statusText = "Not found") {
	return jsonResponse({ body: message, status: 404, statusText });
}

export function jsonResponseForbidden(message: string, statusText = "Forbidden") {
	return jsonResponse({ body: message, status: 403, statusText });
}
