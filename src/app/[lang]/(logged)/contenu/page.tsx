import { CardContentManager } from "@/components/ui/Card";
import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params: { lang } }: PageParamsI18n,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${i18n[lang]("CONTENT_MANAGEMENT")} - ${(await parent).title?.absolute}`,
  };
}

export default async function Page({ params: { lang } }: PageParamsI18n) {
  return (
    <div className="flex flex-col gap-y-6 justify-center items-center">
      <CardContentManager
        redirect={`/${lang}/contenu/articles`}
        title={i18n[lang]("SEE_ARTICLES")}
      />
      <CardContentManager
        redirect={`/${lang}/contenu/pages`}
        title={i18n[lang]("SEE_PAGES")}
      />
    </div>
  );
}
