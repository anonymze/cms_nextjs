"use client";

import { useFormState } from "react-dom";
import { generateAndWriteApiKey, writeGithubKeys, writeGoogleKeys } from "../_server/actions";
import ApiForm from "./_forms/ApiForm";
import GithubForm from "./_forms/GithubForm";
import GoogleForm from "./_forms/GoogleForm";
import { Accordion } from "@/components/ui/accordion/Accordion";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";

export type StateConfigurationApiForm = {
	apiKey: string;
	error: boolean;
};

export type StateConfigurationGithubForm = {
	clientId: string;
	clientSecret: string;
	error: boolean;
};

export type StateConfigurationGoogleForm = {
	clientId: string;
	clientSecret: string;
	error: boolean;
};

type Configuration = {
	apiKey: StateConfigurationApiForm["apiKey"];
	githubClientId?: StateConfigurationGithubForm["clientId"];
	githubClientSecret?: StateConfigurationGithubForm["clientSecret"];
	googleClientId?: StateConfigurationGoogleForm["clientId"];
	googleClientSecret?: StateConfigurationGoogleForm["clientSecret"];
};

export default function Content({ configuration }: { configuration: Configuration }) {
	const lang = useContext(LangContext);

	const [stateApi, formActionApi] = useFormState(generateAndWriteApiKey, {
		apiKey: configuration.apiKey,
		error: false,
	});

	const [stateGithub, formActionGithub] = useFormState(writeGithubKeys, {
		clientId: configuration.githubClientId ?? "",
		clientSecret: configuration.githubClientSecret ?? "",
		error: false,
	});

	const [stateGoogle, formActionGoggle] = useFormState(writeGoogleKeys, {
		clientId: configuration.googleClientId ?? "",
		clientSecret: configuration.googleClientSecret ?? "",
		error: false,
	});

	return (
		<>
			<h2 className="mb-3">API</h2>
			<form action={formActionApi} className="mb-8">
				<ApiForm state={stateApi} />
			</form>

			<h2 className="mb-3">{i18n[lang]("OAUTH_SERVICES")}</h2>

			<Accordion className="mb-3" title="Github" name="auth">
				<form action={formActionGithub}>
					<GithubForm state={stateGithub} />
				</form>
			</Accordion>

			<Accordion title="Google" name="auth">
				<form action={formActionGoggle}>
					<GoogleForm state={stateGoogle} />
				</form>
			</Accordion>
		</>
	);
}
