import type { I18n } from "@/types/i18n";
import en_US from "./en_US";
import fr_FR from "./fr_FR";
import es_ES from "./fr_FR";

// if you add a language, don't forget to add the svg in the flags folder
// or async import()... will throw an incontrollable error
const i18n: Record<I18n, object> = {
  en_US,
  fr_FR,
  es_ES,
};

export { i18n };
