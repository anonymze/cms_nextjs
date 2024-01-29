import Content from "./components/Content";
import { ENV_SERVER } from "@/env/server";

export default async function Page() {
	return <Content configuration={{ apiKey: ENV_SERVER.API_KEY }} />;
}
