import { jsonResponse } from "./core_logic";
import { getResponseHeader } from "./response_header";

// you should use this response when you want to send a 2** response because it sets the correct header and renew the cookie
export function jsonResponsePost(body: unknown, withCookieApiToken = true) {
  return jsonResponse({
    body,
    status: 201,
    statusText: "OK",
    headers: getResponseHeader(withCookieApiToken),
  });
}
