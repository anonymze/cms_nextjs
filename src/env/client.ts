import z from "zod";

const envClientSchema = z.object({
	NEXT_PUBLIC_URL: z.string().url(),
	NEXT_PUBLIC_API_URL: z.string().url(),
	NEXT_PUBLIC_GITHUB_ASK_AUTHORIZATION_URL: z.string().url().optional(),
	NEXT_PUBLIC_GITHUB_CLIENT_ID: z.string().optional(),
});

type EnvClientType = z.infer<typeof envClientSchema>;

// we adjust the typing because we don't know if the envs are set
export const envClientTyped: { [Key in keyof EnvClientType]: EnvClientType[Key] | undefined } = {
	NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	NEXT_PUBLIC_GITHUB_ASK_AUTHORIZATION_URL: process.env.NEXT_PUBLIC_GITHUB_ASK_AUTHORIZATION_URL,
	NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
};

/**
 * public envs are passed to the client after build time
 */
export const ENV_CLIENT = envClientSchema.parse(envClientTyped);
