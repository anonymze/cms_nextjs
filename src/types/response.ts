interface JsonResponseCore {
    status: number,
    statusText: string,
    headers?: HeadersInit
}

export interface JsonResponse extends JsonResponseCore {
    body: unknown,
} 
