import { CardContentManager } from "@/components/ui/Card";
import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { ResolvingMetadata, Metadata } from "next";

export async function generateMetadata(
  { params: { lang } }: PageParamsI18n,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${i18n[lang]("CONTENT_CREATION")} - ${(await parent).title?.absolute}`,
  };
}

export default async function Page() {
	return (
		<div className="flex flex-col gap-y-6 justify-center items-center">
			<CardContentManager redirect="/creation-contenu/article" title="Créer un article" />
			<CardContentManager redirect="/creation-contenu/page" title="Créer une page" />
		</div>
	);
}
