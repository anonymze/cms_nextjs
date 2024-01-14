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

export function jsonResponsePatch(body: unknown, withCookieApiToken = true) {
  return jsonResponse({
    body,
    status: 200,
    statusText: "OK",
    headers: getResponseHeader(withCookieApiToken),
  });
}

export function responseDelete(withCookieApiToken = true) {
  return new Response(null, {
    status: 204,
    statusText: "OK",
    headers: getResponseHeader(withCookieApiToken),
  });
}
