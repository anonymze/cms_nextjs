import { z } from "zod";

export const envServerSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  API_KEY: z.string()
});

/**
 * server side we juste parse the envs
 */
export const ENV_SERVER = envServerSchema.parse(process.env);
