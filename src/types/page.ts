import { z } from "zod";

export const formCreatePageSchema = z.object({
    title: z.string().min(2).max(30).trim(),
    subtitle: z.string().min(2).max(30).trim().optional(),
    description: z.string().min(2).max(100).trim(),
  });

