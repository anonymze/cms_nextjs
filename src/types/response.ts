type CompositionResponse = {
    headerResponse: ResponseInit,
    bodyResponse: unknown,
}

type  CompositionResponseNoError = CompositionResponse &  {
    error: false,
}

type  CompositionResponseError = CompositionResponse &  {
    error: true,
}

export type PostCompositionResponse = CompositionResponseNoError & {
    contentRequest: Promise<unknown>
} | CompositionResponseError & {
    contentRequest: null,
}

export type GetCompositionresponse = CompositionResponseNoError;