import { z } from "zod";

export const formCreateConfigurationApiSchema = z.object({
    apiKey: z.string().min(20),
})

export const formCreateConfigurationGithubSchema = z.object({
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
})