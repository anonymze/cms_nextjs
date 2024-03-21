import { z } from "zod";
import { I18n } from "./i18n";
import type { Article } from "@prisma/client";

export type ArticleI18n = {
	uuid: Article["uuid"];
	i18n: Array<{
		conclusion?: string;
		content: string;
		description?: string;
		title: string;
		lang: I18n;
	}>;
};

// Zod schema
export const articleSchema = z.object({
	conclusion: z.string().max(400).trim().optional(),
	content: z.string().min(2).trim(),
	description: z.string().max(400).trim().optional(),
	lang: z.string().default(I18n.DEFAULT),
	title: z.string().min(2).max(40).trim(),
});

export const formCreateArticleSchema = articleSchema.refine(
	(data) => {
		// editor tiptap return <p></p> if empty, we have to check if the content has been populated
		return data.content !== "<p></p>";
	},
	{ message: "String must contain at least 1 character" }
);
