import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getArticleQuery } from "@/api/queries/articleQueries";
import Content from "./_components/Content";
import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { ResolvingMetadata, Metadata } from "next";
import { useSearchParams } from "next/navigation";

export async function generateMetadata(
  { params: { lang } }: PageParamsI18n,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${i18n[lang]("ARTICLE")} - ${(await parent).title?.absolute}`,
  };
}

export default async function Page({ params }: { params: { uuid: string } }) {
	const queryClient = new QueryClient();
	
	await queryClient.prefetchQuery({
		queryKey: ["article", { slug: params.uuid}],
		queryFn: getArticleQuery,
	});
	
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Content uuid={params.uuid} />
		</HydrationBoundary>
	);
}
