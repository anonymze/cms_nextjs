import type { I18n } from "@/types/i18n";
import en_US from "./en-US";
import fr_FR from "./fr-FR";
import es_ES from "./fr-FR";

// if you add a new language, don't forget to add the svg in the assets flags folder
// otherwise await import()... will throw an incontrollable error
const i18n: Record<I18n, { [key: string]: string}> = {
	"en-US": en_US,
	"fr-FR": fr_FR,
	"es-ES": es_ES,
};

export { i18n };
