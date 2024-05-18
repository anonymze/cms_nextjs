// this is our source of truth for the i18n languages
export enum I18n {
	DEFAULT = "en",
	EN = "en",
	ES = "es",
	FR = "fr",
}

export type PageParamsI18n = {
	params : {
		lang: I18n
	}
}