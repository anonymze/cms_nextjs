import { z } from "zod";

export const formCreateConfigurationSchema = z.object({
    apiKey: z.string().min(20),
})