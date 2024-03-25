import { z } from "zod";
import { I18n } from "./i18n";

export const createMediaDetailsSchema = z.object({
	mediaUuids: z.array(z.string()),
	// need to match the name of the entity with prisma to work
	entityAttached: z.enum(["page", "article"]),
	entityUuid: z.string(),
	lang: z.string().default(I18n.DEFAULT),
});

export const updateMediaDetailsSchema = z.object({
	legend: z.string().max(400).trim().optional(),
	tag: z.string().max(40).trim().optional(),
	title: z.string().min(2).max(40).trim(),
});
