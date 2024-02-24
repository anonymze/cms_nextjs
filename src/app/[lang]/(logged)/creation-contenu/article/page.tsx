import { ContentFormI18n } from "@/components/ContentFormI18n";
import FormArticle from "./_components/Form";
import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { ResolvingMetadata, Metadata } from "next";

export async function generateMetadata(
  { params: { lang } }: PageParamsI18n,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${i18n[lang]("ARTICLE")} - ${(await parent).title?.absolute}`,
  };
}

export default async function Page() {
	return (
		<ContentFormI18n>
			<FormArticle />
		</ContentFormI18n>
	);
}
