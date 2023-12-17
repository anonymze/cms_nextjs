import { getArticlesQuery } from "@/api/queries/articleQueries";
import { useSuspenseQuery } from "@tanstack/react-query";

const Content: React.FC = () => {
  // TODO fix bug here on build
  const { data: articles } = useSuspenseQuery({
    queryKey: ["uploads"],
    queryFn: getArticlesQuery,
  });

  return (
    // <DataTable data={articles} columns={columns} />
    <div>ok</div>
  );
};

export default Content;
