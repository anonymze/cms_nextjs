import { z } from "zod";

const envServerSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  API_KEY: z.string(),
  // CLERK
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
  // GITHUB
  NEXT_PUBLIC_GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GITHUB_REDIRECT_URL: z.string().url().optional(),
  GITHUB_ACCESS_TOKEN_URL: z.string().url().optional(),
  GITHUB_USER_URL: z.string().url().optional(),
  GITHUB_MAGIC_LINK_URL: z.string().url().optional(),
});

/**
 * server side we juste parse the envs
 */
export const ENV_SERVER = envServerSchema.parse(process.env);
