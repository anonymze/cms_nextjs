import { getResponseHeader } from "./header";
import { jsonResponse } from "./json_response";


export function jsonResponseGet(body: unknown, withCookieApiToken = true) {
	return jsonResponse({
		body,
		status: 200,
		statusText: "OK",
		headers: getResponseHeader(withCookieApiToken),
	});
}

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
