import { getUploadsQuery } from "@/api/uploadQueries";
import Uploads from "./components/Uploads";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// get the data from the server then hydrate it on children
// or you can props drilling with initial data (i use this if only 1 layer of code)
export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["uploads"],
    queryFn: getUploadsQuery,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Uploads />
    </HydrationBoundary>
  );
}
