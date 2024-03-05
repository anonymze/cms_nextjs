import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { ResolvingMetadata, Metadata } from "next";

export async function generateMetadata(
	{ params: { lang } }: PageParamsI18n,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	return {
		title: `${i18n[lang]("DASHBOARD")} - ${(await parent).title?.absolute}`,
	};
}

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 6000));

	return (
		<div>
			<h1>salut</h1>
		</div>
	);
}
