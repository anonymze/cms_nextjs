import { z } from "zod";

// Zod schema
export const formCreatePageSchema = z.object({
  description: z.string().min(2).max(100).trim(),
  subtitle: z.string().min(2).max(30).trim().optional(),
  title: z.string().min(2).max(30).trim(),
});

