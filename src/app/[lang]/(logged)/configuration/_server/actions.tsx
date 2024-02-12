"use server";


import { randomUUID } from "crypto";
import fs from "fs";
import type {
	StateConfigurationApiForm,
	StateConfigurationGithubForm,
} from "../_components/Content";
import { formCreateConfigurationApiSchema, formCreateConfigurationGithubSchema } from "@/types/configuration";

const FILE_TO_WRITE = ".env.local";
/* api */
const ENV_API_KEY = "API_KEY=";
/* oauth github */
const ENV_GITHUB_CLIENT_SECRET = "GITHUB_CLIENT_SECRET=";
const ENV_GITHUB_PUBLIC_CLIENT_ID = "GITHUB_PUBLIC_CLIENT_ID=";
const ENV_GITHUB_STATE = "GITHUB_STATE=";
/* oauth google */
const ENV_GOOGLE_PUBLIC_CLIENT_ID = "GOOGLE_PUBLIC_CLIENT_ID=";
const ENV_GOOGLE_CLIENT_SECRET = "GOOGLE_CLIENT_SECRET=";


export async function generateAndWriteApiKey(_: StateConfigurationApiForm, __: FormData) {
	const result = formCreateConfigurationApiSchema.safeParse({ apiKey: randomUUID() });

	if (!result.success) return { apiKey: "", error: true };

	try {
		writeEnvKey(ENV_API_KEY, result.data.apiKey);
	} catch (err) {
		return { apiKey: "", error: true };
	}

	return {
		apiKey: result.data.apiKey,
		error: false,
	};
}

export async function writeGithubKeys(_: StateConfigurationGithubForm, form: FormData) {
	const result = formCreateConfigurationGithubSchema.safeParse({ clientId: form.get('clientId'), clientSecret: form.get('clientSecret')});

	if (!result.success) return { clientId: "", clientSecret: "", error: true };

	try {
		writeEnvKey(ENV_GITHUB_PUBLIC_CLIENT_ID, result.data.clientId);
		writeEnvKey(ENV_GITHUB_CLIENT_SECRET, result.data.clientSecret);
		writeEnvKey(ENV_GITHUB_STATE, randomUUID());
	} catch (err) {
		return { clientId: "", clientSecret: "", error: true };
	}

	return { clientId: result.data.clientId, clientSecret: result.data.clientSecret, error: false };
}

export async function writeGoogleKeys(_: StateConfigurationGithubForm, form: FormData) {
	const result = formCreateConfigurationGithubSchema.safeParse({ clientId: form.get('clientId'), clientSecret: form.get('clientSecret')});

	if (!result.success) return { clientId: "", clientSecret: "", error: true };

	try {
		writeEnvKey(ENV_GOOGLE_PUBLIC_CLIENT_ID, result.data.clientId);
		writeEnvKey(ENV_GOOGLE_CLIENT_SECRET, result.data.clientSecret);
	} catch (err) {
		return { clientId: "", clientSecret: "", error: true };
	}

	return { clientId: result.data.clientId, clientSecret: result.data.clientSecret, error: false };
}

const writeEnvKey = (keyName: string, content: string) => {
	let contentFile = "";

	// check if file exists before reading
	if (fs.existsSync(FILE_TO_WRITE)) {
		// we get the content .env.local file
		contentFile = fs.readFileSync(FILE_TO_WRITE, "utf8");
	}

	// we rewrite (or create) the file totally with our little adjustment on the env key
	fs.writeFileSync(
		FILE_TO_WRITE,
		contentFile.includes(keyName)
			? contentFile.replace(new RegExp(`${keyName}(.*)`), `${keyName}"${content}"`)
			: `${contentFile}\n# API KEY GENERATED AUTOMATICLY BY YOUR CMS\n${keyName}"${content}"`,
	);
};
