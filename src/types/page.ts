import { z } from "zod";
import { I18n } from "./i18n";
import type { Page } from "@prisma/client";

export type PageI18n = {
	uuid: Page["uuid"];
	tag?: string;
	i18n: Array<{
		description: string;
		subtitle?: string;
		title: string;
		lang: I18n,
		media_details: Array<{
			uuid: string;
			legend?: string;
			tag?: string;
			title: string;
			media: {
				uuid: string;
				filepath_public: string;
				filetype: string;
			};
		}>;
	}>;
};

// Zod schema
export const formCreatePageSchema = z.object({
	description: z.string().min(2).max(400).trim(),
	lang: z.string().default(I18n.DEFAULT),
	subtitle: z.string().max(40).trim().optional(),
	tag: z.string().max(40).trim().optional(),
	title: z.string().min(2).max(40).trim(),
});
