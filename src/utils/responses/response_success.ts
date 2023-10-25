
import { jsonResponse } from "./response";
import { getResponseHeader } from "./response_header";

export function jsonResponsePost(body: unknown, withCookieApiToken = true) {
    return jsonResponse({ body, status: 201, statusText: "OK", headers: getResponseHeader(withCookieApiToken) });
}