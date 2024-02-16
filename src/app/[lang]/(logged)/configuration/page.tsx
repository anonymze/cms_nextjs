import Content from "./_components/Content";
import { ENV_SERVER } from "@/env/server";

export default async function Page() {
	return (
		<Content
			configuration={{
				apiKey: ENV_SERVER.API_KEY,
				githubClientId: ENV_SERVER.GITHUB_PUBLIC_CLIENT_ID,
				githubClientSecret: ENV_SERVER.GITHUB_CLIENT_SECRET,
				googleClientId: ENV_SERVER.GOOGLE_PUBLIC_CLIENT_ID,
				googleClientSecret: ENV_SERVER.GOOGLE_CLIENT_SECRET,
			}}
		/>
	);
}