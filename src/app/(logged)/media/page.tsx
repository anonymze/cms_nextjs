import { getMediaQuery } from "@/api/queries/mediaQueries";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Media from "./components/Media";

// get the data from the server then hydrate it on children
// or you can props drilling with initial data (i use this if only 1 layer of props drilling)
export default async function Page() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["media"],
		queryFn: getMediaQuery,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Media />
		</HydrationBoundary>
	);
}
