import { z } from "zod";
import { I18n } from "./i18n";
import type { Page } from "@prisma/client";

export type PageI18n = {
  description: string;
  subtitle?: string;
  title: string;
  uuid: Page["uuid"];
};

// Zod schema
export const formCreatePageSchema = z.object({
  description: z.string().min(2).max(100).trim(),
  lang: z.string().default(I18n.DEFAULT),
  subtitle: z.string().min(2).max(30).trim().optional(),
  title: z.string().min(2).max(30).trim(),
});

