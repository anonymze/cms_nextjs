"use server";

import { formCreateConfigurationSchema } from "@/types/configuration";
import { randomUUID } from "crypto";
import fs from "fs";
import type { StateConfigurationForm } from "../page";

const FILE_TO_WRITE = ".env.local2";
const ENV_TO_WRITE = "API_KEY=";

export async function generateApiKey(_: StateConfigurationForm, __: FormData) {
	const result = formCreateConfigurationSchema.safeParse({ apiKey: randomUUID() });

	if (!result.success) return { apiKey: "", error: true };

	try {
        let contentFile = "";

        // check if file exists before reading
		if (fs.existsSync(FILE_TO_WRITE)) {
            // we get the content .env.local file
            contentFile = fs.readFileSync(FILE_TO_WRITE, "utf8");
        }

        // we rewrite (or create) the file totally with our little adjustment on the api key
        fs.writeFileSync(
            FILE_TO_WRITE,
            contentFile.includes(ENV_TO_WRITE)
                ? contentFile.replace(/API_KEY=(.*)/, `API_KEY="${result.data.apiKey}"`)
                : `${contentFile}\n# API KEY GENERATED AUTOMATICLY BY YOUR CMS\n${ENV_TO_WRITE}"${result.data.apiKey}"`,
        );

		// we rewrite (or create) the file totally with our little adjustment on the api key
		fs.writeFileSync(
			FILE_TO_WRITE,
			contentFile.includes(ENV_TO_WRITE)
				? contentFile.replace(/API_KEY=(.*)/, `API_KEY="${result.data.apiKey}"`)
				: `${contentFile}\n# API KEY GENERATED AUTOMATICLY BY YOUR CMS\n${ENV_TO_WRITE}"${result.data.apiKey}"`,
		);

	} catch (err) {
		return { apiKey: "", error: true };
	}

	return {
		apiKey: result.data.apiKey,
		error: false,
	};
}
