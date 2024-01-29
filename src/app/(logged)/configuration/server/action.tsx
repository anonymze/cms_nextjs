"use server";

import { formCreateConfigurationSchema } from "@/types/configuration";
import { randomUUID } from "crypto";
import fs from "fs";
import type { StateConfigurationApiForm } from "../components/Content";


const FILE_TO_WRITE = ".env.local";
/* api */
const ENV_API_KEY = "API_KEY=";
/* github */
const ENV_GITHUB_CLIENT_SECRET = "GITHUB_CLIENT_SECRET=";
const ENV_GITHUB_PUBLIC_CLIENT_ID = "GITHUB_PUBLIC_CLIENT_ID=";

export async function generateAndWriteApiKey(_: StateConfigurationApiForm, __: FormData) {
	const result = formCreateConfigurationSchema.safeParse({ apiKey: randomUUID() });

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

export async function writeGithubKeys(_: StateConfigurationApiForm, __: FormData) {
	const result = formCreateConfigurationSchema.safeParse({ apiKey: randomUUID() });

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
