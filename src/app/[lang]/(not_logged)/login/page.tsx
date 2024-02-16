import type { Metadata } from "next";
import Content from "./_components/Content";
import { ENV_SERVER } from "@/env/server";
import type { PageParamsI18n } from "@/types/i18n";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication forms built using the components.",
};

export default function Page({ params: { lang} }: PageParamsI18n) {
	return (
		<Content
			lang={lang}
			githubAuth={
				ENV_SERVER.GITHUB_ASK_AUTHORIZATION_URL
					? { url: ENV_SERVER.GITHUB_ASK_AUTHORIZATION_URL }
					: undefined
			}
			googleAuth={
				ENV_SERVER.GOOGLE_ASK_AUTHORIZATION_URL
					? { url: ENV_SERVER.GOOGLE_ASK_AUTHORIZATION_URL }
					: undefined
			}
		/>
	);
}
