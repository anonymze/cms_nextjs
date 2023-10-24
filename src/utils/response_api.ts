import type { PostCompositionResponse } from "@/types/response";

export function getHeadersApi() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('set-cookie', `token=${process.env.API_KEY}; Max-Age=2592000; path=/api; HttpOnly; SameSite=None; Secure;`);
    return headers;
}

export const jsonResponseUnauthorized = Response.json({ status: 401, message: 'Non autorisé' }, { status: 401, statusText: 'Unauthorized' });

export function createPostResponseApi(request: Request): PostCompositionResponse {
    const composition = new Map();
    composition.set('headers', getHeadersApi());

    try {
        if (request.headers.get('content-type') === 'application/json') {
            composition.set('content', request.json());
        }

        if (request.headers.get('content-type')?.startsWith('multipart/form-data')) {
            composition.set('content', request.json());
        }   

        composition
            .set('error', false)
            .set('status', 201)
            .set('statusText', "ok")
        ;
    }
    catch (error) {
        console.log(error);
        composition
            .set('body', { status: 400, message: 'Bad Request' })
            .set('error', true)
            .set('status', 400)
            .set('statusText', "Bad Request");
    }

    return {
        error: composition.get('error'),
        contentRequest: composition.get('content'),
        bodyResponse: composition.get('body'),
        headerResponse: 
             { 
                status: composition.get('status'),
                statusText: composition.get('statusText'),
                headers: composition.get('headers') 
            }
    }
}

export async function logicPostResponse(request: Request, createResponse: (req: Request) => PostCompositionResponse, parserData: (data: unknown) => Error | void) {
    const { bodyResponse, contentRequest, error, headerResponse } = createResponse(request); 

    if (error) return Response.json(bodyResponse, headerResponse);
  
    try {
      const data = parserData(await contentRequest);
    } catch (error) {
      return Response.json({ status: 400, message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
    }
  
    return Response.json(bodyResponse, headerResponse);
}