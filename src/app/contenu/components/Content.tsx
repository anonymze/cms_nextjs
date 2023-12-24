"use client";

import { getArticlesQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";

const Content: React.FC = () => {
  // TODO fix bug here on build
  const { data: articles } = useQuery({
    queryKey: ["uploads"],
    queryFn: getArticlesQuery,
  });

  return (
    // <DataTable data={articles} columns={columns} />
    <div>ok</div>
  );
};

export default Content;
