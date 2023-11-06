import { z } from "zod";

/** JSON RESPONSE */
interface JsonResponseCore {
	status: number,
	statusText: string,
	headers?: HeadersInit
}

export interface JsonResponse extends JsonResponseCore {
	body: unknown,
} 

export function jsonResponse({body, status, statusText, headers}: JsonResponse) {
	if (typeof body === 'string') return Response.json({ status, message: body }, { status, statusText, headers });
	return Response.json(body, { status, statusText, headers });
}

/** PARSER REQUEST */
type ParserRequest<T = undefined> = { error: true, messageError: string } | { error: false, [key: string]: T | T[] | boolean };
type ContentTypeAccepted = 'multipart/form-data' | 'application/json';

function validContentType(headers: Headers, acceptedContentType: ContentTypeAccepted) {
	if (headers.get('content-type')?.startsWith(acceptedContentType)) {
		return { error: false, contentType: acceptedContentType } satisfies ParserRequest<ContentTypeAccepted>;
	}
	
	return { error: true, messageError: 'Content-Type doit être de type multipart/form-data' } satisfies ParserRequest;
}

function validData<T>(data: unknown, contentType: ContentTypeAccepted, dataSchema: z.ZodType<T>)  {
	try {
		if (contentType !== 'multipart/form-data') {
			// parse throw an error if data does not match schema
			return { error: false, dataVerified: dataSchema.parse(data) } satisfies ParserRequest<T>;
		}

		const files = (data as FormData).getAll("files[]");	

		if (!files || files.length === 0) {
			throw new Error();
		}

		const filesParsed = [];
			
		for (let file of files) {
			filesParsed.push(dataSchema.parse(file));
		}
		
		return { error: false, dataVerified: filesParsed } satisfies ParserRequest<T>;		
	} catch (err) {
		if (err instanceof z.ZodError) {
			return { error: true, messageError: err.message } satisfies ParserRequest;
		}

		return { error: true, messageError: 'Les données sont invalides' } satisfies ParserRequest;
	}
}


export async function parseBody(req: Request, contentType: ContentTypeAccepted) {
	try {
		if (contentType === 'multipart/form-data') {
			return { error: false, dataParsed: await req.formData() }  satisfies ParserRequest<FormData>;
		}

		return { error: false, dataParsed: await req.json() } satisfies ParserRequest<any>;
	} catch(err) {
		return { error: true, messageError: "Le contenu n'a pas pu être parsé" } satisfies ParserRequest
	}
}

export const parserRequest = {
	validContentType,
	parseBody,
	validData,
}
  
