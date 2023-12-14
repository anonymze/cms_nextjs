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

export interface JsonResponse extends JsonResponseCore {
  body: unknown;
}

type ContentTypeAccepted = "multipart/form-data" | "application/json";

/** MY JSON RESPONSE */
export function jsonResponse({ body, status, statusText, headers }: JsonResponse) {
  if (typeof body === "string") {
    return Response.json({ status, message: body }, { status, statusText, headers });
  }
  
  return Response.json(body, { status, statusText, headers });
}

/** PARSER REQUEST */
export class ParserRequest {
  constructor(
    readonly request: Request,
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
      if (this.contentType === "multipart/form-data") {
        let newData: Record<string, unknown> = {};
        const files = (data as FormData).getAll("files[]");

        newData["files"] = files;

        for (let [key, value] of (data as FormData).entries()) {
          if (key === "files[]") continue;
          newData[key] = value;
        }

        data = newData;
      }

      return { error: false, dataVerified: dataSchema.parse(data) } satisfies ParserRequestReturn<T>;
    } catch (err) {
      if (err instanceof Error) {
        return { error: true, messageError: err.message } satisfies ParserRequestReturn;
      }

      return { error: true, messageError: "Les données sont invalides" } satisfies ParserRequestReturn;
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

      return { error: false, dataParsed: await this.request.json() } satisfies ParserRequestReturn<any>;
    } catch (_) {
      return {
        error: true,
        messageError: "Le contenu n'a pas pu être parsé",
      } satisfies ParserRequestReturn;
    }
  }
}
