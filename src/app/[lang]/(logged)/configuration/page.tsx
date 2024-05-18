import Content from "./_components/Content";
import { ENV_SERVER } from "@/env/server";
import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params: { lang } }: PageParamsI18n,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${i18n[lang]("CONFIGURATION")} - ${(await parent).title?.absolute}`,
  };
}

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
