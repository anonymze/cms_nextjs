import { jsonResponse } from "./response";

export function jsonResponseUnauthorized(message = "Non autorisé") {
  jsonResponse({ body: message, status: 401, statusText: "Unauthorized" });
}

export function jsonResponseBadRequest(message: string, statusText = "Bad Request") {
  return jsonResponse({ body: message, status: 400, statusText });
}
