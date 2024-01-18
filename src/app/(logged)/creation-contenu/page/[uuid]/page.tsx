import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Content from "./components/Content";
import { getPageQuery } from "@/api/queries/pageQueries";

export default async function Page({ params }: { params: { uuid: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["page", { slug: params.uuid }],
    queryFn: getPageQuery,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content uuid={params.uuid} />
    </HydrationBoundary>
  );
}
