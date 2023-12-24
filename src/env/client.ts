import z from "zod";

const envClientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

type EnvClientType = z.infer<typeof envClientSchema>;

// we adjust the typing because we don't know if the envs are set
export const envClientTyped: {[key in keyof EnvClientType]: EnvClientType[keyof EnvClientType] | undefined} = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

/**
 * public envs are passed to the client after build time
 */
export const ENV_CLIENT = envClientSchema.parse(envClientTyped);
