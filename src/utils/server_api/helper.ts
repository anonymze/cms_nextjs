import { I18n } from "@/types/i18n";
import Negotiator from "negotiator";

/**
 * @description - get the prefered locale from the headers
 */
export function getPreferedLocale(
  headers: Headers,
  localesAccepted: string[],
  defaultLocale: I18n = I18n.DEFAULT
) {
  const negotiator = new Negotiator({
    headers: {
      "accept-language": headers.get("accept-language") ?? "",
    },
  });

  return negotiator.language(localesAccepted) ?? defaultLocale
}
