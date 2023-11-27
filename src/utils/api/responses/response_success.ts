import { jsonResponse } from "./core_logic";
import { getResponseHeader } from "./response_header";

export function jsonResponsePost(body: unknown, withCookieApiToken = true) {
  return jsonResponse({
    body,
    status: 201,
    statusText: "OK",
    headers: getResponseHeader(withCookieApiToken),
  });
}
