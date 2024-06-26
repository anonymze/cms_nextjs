import { z } from "zod";

const envServerSchema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("production"),
	API_KEY: z.string().min(1),
	// CLERK
	CLERK_SECRET_KEY: z.string(),
	CLERK_MAGIC_LINK_URL: z.string().url(),
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
	// GITHUB
	GITHUB_PUBLIC_CLIENT_ID: z.string().optional(),
	GITHUB_CLIENT_SECRET: z.string().optional(),
	GITHUB_REDIRECT_URL: z.string().url().optional(),
	GITHUB_STATE: z.string().optional(),
	GITHUB_ASK_AUTHORIZATION_URL: z.string().url().optional(),
	GITHUB_ACCESS_TOKEN_URL: z.string().url().optional(),
	GITHUB_USER_URL: z.string().url().optional(),
	// GOOGLE
	GOOGLE_ASK_AUTHORIZATION_URL: z.string().url().optional(),
	GOOGLE_ACCESS_TOKEN_URL: z.string().url().optional(),
	GOOGLE_USER_URL: z.string().url().optional(),
	GOOGLE_PUBLIC_CLIENT_ID: z.string().optional(),
	GOOGLE_CLIENT_SECRET: z.string().optional(),
	GOOGLE_REDIRECT_URL: z.string().optional(),
});

// server side we parse the envs
export const ENV_SERVER = envServerSchema.parse(process.env);
