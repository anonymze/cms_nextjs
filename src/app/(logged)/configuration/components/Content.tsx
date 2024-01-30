"use client";

import { useFormState } from "react-dom";
import { generateAndWriteApiKey, writeGithubKeys } from "../server/action";
import ApiForm from "./form/ApiForm";
import GithubForm from "./form/GithubForm";
import GoogleForm from "./form/GoogleForm";

export type StateConfigurationApiForm = {
	apiKey: string;
	error: boolean;
};

export type StateConfigurationGithubForm = {
	clientId: string;
	clientSecret: string;
	error: boolean
};

type Configuration = {
	apiKey: StateConfigurationApiForm["apiKey"];
	githubClientId: StateConfigurationGithubForm["clientId"];
	githubClientSecret: StateConfigurationGithubForm["clientSecret"];
};

export default function Content({ configuration }: { configuration: Configuration }) {
	const [stateApi, formActionApi] = useFormState(generateAndWriteApiKey, {
		apiKey: configuration.apiKey,
		error: false,
	});

    const [stateGithub, formActionGithub] = useFormState(writeGithubKeys, {
		clientId: configuration.githubClientId,
		clientSecret: configuration.githubClientSecret,
		error: false,
	});

    const [stateGoogle, formActionGoggle] = useFormState(generateAndWriteApiKey, {
		apiKey: configuration.apiKey,
		error: false,
	});

	return (
		<>
			<form action={formActionApi} className="mb-8">
				<ApiForm state={stateApi} />
			</form>

			<details name="config" className="mb-6">
				<summary>Github</summary>
				<form action={formActionGithub} className="mb-8">
					<GithubForm state={stateGithub} />
				</form>
			</details>

			<details name="config">
				<summary>Google</summary>
				<form action={formActionGoggle} className="mb-8">
					<GoogleForm state={stateGoogle} />
				</form>
			</details>
		</>
	);
}
