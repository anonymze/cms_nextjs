"use client";

import { useFormState } from "react-dom";
import { generateAndWriteApiKey, writeGithubKeys } from "../server/action";
import ApiForm from "./form/ApiForm";
import GithubForm from "./form/GithubForm";
import GoogleForm from "./form/GoogleForm";
import { Accordion } from "@/components/ui/Accordion/Accordion";

export type StateConfigurationApiForm = {
	apiKey: string;
	error: boolean;
};

export type StateConfigurationGithubForm = {
	clientId: string;
	clientSecret: string;
	error: boolean;
};

type Configuration = {
	apiKey: StateConfigurationApiForm["apiKey"];
	githubClientId?: StateConfigurationGithubForm["clientId"];
	githubClientSecret?: StateConfigurationGithubForm["clientSecret"];
};

export default function Content({ configuration }: { configuration: Configuration }) {
	const [stateApi, formActionApi] = useFormState(generateAndWriteApiKey, {
		apiKey: configuration.apiKey,
		error: false,
	});

	const [stateGithub, formActionGithub] = useFormState(writeGithubKeys, {
		clientId: configuration.githubClientId ?? "",
		clientSecret: configuration.githubClientSecret ?? "",
		error: false,
	});

	const [stateGoogle, formActionGoggle] = useFormState(generateAndWriteApiKey, {
		apiKey: configuration.apiKey,
		error: false,
	});

	return (
		<>
			<h2 className="mb-3">API</h2>
			<form action={formActionApi} className="mb-8">
				<ApiForm state={stateApi} />
			</form>

			<h2 className="mb-3">OAuth services</h2>

			<Accordion className="mb-3" title="Github" name="auth">
				<form action={formActionGithub}>
					<GithubForm state={stateGithub} />
				</form>
			</Accordion>

			<Accordion title="Google" name="auth">
				<form action={formActionGoggle}>
					<GithubForm state={stateGithub} />
				</form>
			</Accordion>
		</>
	);
}
