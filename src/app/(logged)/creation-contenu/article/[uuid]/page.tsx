import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getArticleQuery } from "@/api/queries/articleQueries";
import Content from "./components/Content";

export default async function Page({ params }: { params: { uuid: string } }) {
	const queryClient = new QueryClient();

	
	await queryClient.prefetchQuery({
		queryKey: ["article", { slug: params.uuid }],
		queryFn: getArticleQuery,
	});
	
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Content uuid={params.uuid} />
		</HydrationBoundary>
	);
}
