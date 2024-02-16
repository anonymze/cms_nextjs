import langs from "./langs"
import ReactDOMServer from "react-dom/server";
import { sprintf } from "@/utils/helper";
import type { I18n } from "@/types/i18n";
import type { ReactElement, ReactNode } from "react";

// if you add a new language, don't forget to add the svg in the assets flags folder
// otherwise await import()... will throw an incontrollable error
const i18n: Record<I18n, (str: keyof typeof langs[I18n], ...args: Exclude<ReactNode, boolean | undefined>[]) => string> = {
	en: (str, ...args) => {
		return sprintf(langs.en[str], ...args)
	},
	es: (str, ...args) => {
		return sprintf(langs.es[str], ...args)
	},
	fr: (str, ...args) => {
		console.log('ici');
		console.log(typeof args[0]);
		return sprintf(langs.fr[str], ...args)
	},

};

export { i18n };