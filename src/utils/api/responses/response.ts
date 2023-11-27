import type { z } from "zod";
import { parserRequest } from "./core_logic";

type ProcessRequest<T> = {
  error: true;
  messageError: string;
} |
{
  error: false;
  data: T;
};

/**
 *
 * @param req The original request to parse
 * @param acceptedContentType What type of data is accepted
 * @param dataSchema Validator schema
 */
export async function processRequest<T>(
  req: Request,
  acceptedContentType: "application/json" | "multipart/form-data",
  dataSchema: z.ZodType<T>,
) {
  const {
    error: errorContentType,
    messageError: messageErrorContentType,
    contentType,
  } = parserRequest.validContentType(req.headers, acceptedContentType);

  if (errorContentType) return { error: true, messageError: messageErrorContentType } satisfies ProcessRequest<T>;

  const {
    error: errorParsing,
    messageError: messageErrorParsing,
    dataParsed,
  } = await parserRequest.parseBody(req, contentType);

  if (errorParsing) return { error: true, messageError: messageErrorParsing } satisfies ProcessRequest<T>;

  const {
    error: errorVerification,
    messageError: messageErrorVerification,
    dataVerified,
  } = parserRequest.validData(dataParsed, contentType, dataSchema);

  if (errorVerification) return { error: true, messageError: messageErrorVerification } satisfies ProcessRequest<T>;


  return { error: false, data: dataVerified } satisfies ProcessRequest<T>;
}
