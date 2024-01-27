import type { NextRequest } from "next/server";
import { z } from "zod";

/** TYPING */
type ParserRequestReturn<T = undefined> =
	| { error: true; messageError: string }
	| { error: false; [key: string]: T | boolean };

interface JsonResponseCore {
	status: number;
	statusText: string;
	headers?: HeadersInit;
}

interface JsonResponse extends JsonResponseCore {
	body: unknown;
}

type ContentTypeAccepted = "multipart/form-data" | "application/json";

/** MY JSON RESPONSE */
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

/** PARSER REQUEST */
export class ParserRequest {
	constructor(
		readonly request: NextRequest,
		readonly contentType: ContentTypeAccepted,
	) {}

	validContentType() {
		if (this.request.headers.get("content-type")?.startsWith(this.contentType)) {
			return {
				error: false,
				contentType: this.contentType,
			} satisfies ParserRequestReturn<ContentTypeAccepted>;
		}

		return {
			error: true,
			messageError: "Content-Type doit être de type multipart/form-data",
		} satisfies ParserRequestReturn;
	}

	validData<T>(data: unknown, dataSchema: z.ZodType<T>) {
		try {
			let dataToParse = data;

			if (this.contentType === "multipart/form-data") {
				const dataFormData: Record<string, unknown> = {};
				const files = (data as FormData).getAll("files[]");

				dataFormData.files = files;

				for (const [key, value] of (data as FormData).entries()) {
					if (key === "files[]") continue;
					dataFormData[key] = value;
				}

				dataToParse = dataFormData;
			}

			return {
				error: false,
				dataVerified: dataSchema.parse(dataToParse),
			} satisfies ParserRequestReturn<T>;
		} catch (err) {
			if (err instanceof Error) {
				return { error: true, messageError: err.message } satisfies ParserRequestReturn;
			}

			return {
				error: true,
				messageError: "Les données sont invalides",
			} satisfies ParserRequestReturn;
		}
	}

	async parseBody() {
		try {
			if (this.contentType === "multipart/form-data") {
				return {
					error: false,
					dataParsed: await this.request.formData(),
				} satisfies ParserRequestReturn<FormData>;
			}

			return {
				error: false,
				dataParsed: await this.request.json(),
			} satisfies ParserRequestReturn<any>;
		} catch (_) {
			return {
				error: true,
				messageError: "Le contenu n'a pas pu être parsé",
			} satisfies ParserRequestReturn;
		}
	}
}
