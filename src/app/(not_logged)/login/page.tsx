import type { Metadata } from "next";
import Content from "./components/Content";
import { ENV_SERVER } from "@/env/server";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
	return (
		<Content
			githubAuth={
				ENV_SERVER.GITHUB_ASK_AUTHORIZATION_URL
					? { url: ENV_SERVER.GITHUB_ASK_AUTHORIZATION_URL }
					: undefined
			}
		/>
	);
}
