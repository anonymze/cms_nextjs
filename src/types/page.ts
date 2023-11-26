import { z } from "zod";

// TS type
export type Page = {
  readonly id: number;
  readonly uuid: string;
  title: string;
  subtitle?: string;
  description: string;
};

// Zod schema
export const formCreatePageSchema = z.object({
    title: z.string().min(2).max(30).trim(),
    subtitle: z.string().min(2).max(30).trim().optional(),
    description: z.string().min(2).max(100).trim(),
  });

