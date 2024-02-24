
import Content from "./_components/Content";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getArticlesQuery } from "@/api/queries/articleQueries";
import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { ResolvingMetadata, Metadata } from "next";

export async function generateMetadata(
  { params: { lang } }: PageParamsI18n,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${i18n[lang]("ARTICLES")} - ${(await parent).title?.absolute}`,
  };
}

// get the data from the server then hydrate it on children
// or you can props drilling with initial data (i use this if only 1 layer of props drilling)
export default async function Page() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["articles"],
		queryFn: getArticlesQuery,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Content />
		</HydrationBoundary>
	);
}
