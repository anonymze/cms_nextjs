import type { I18n } from "@/types/i18n";
import en from "./en";
import fr from "./fr";
import es from "./es";

// if you add a new language, don't forget to add the svg in the assets flags folder
// otherwise await import()... will throw an incontrollable error
const i18n: Record<I18n, { [key: string]: string}> = {
	en,
	fr,
	es,
};

export { i18n };
