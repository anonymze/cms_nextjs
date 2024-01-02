"use client";

import { getArticlesQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table/Table";
import type { Article } from "@prisma/client";
import { excludeEntryFromArrayOfObjects } from "@/utils/exclude_entry";

const Content: React.FC = () => {
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticlesQuery,
  });

  if (!articles) {
    return <div>Chargement...</div>;
  }

  if (articles.length === 0) {
    return <div>Aucune donnée...</div>;
  }

  const data = excludeEntryFromArrayOfObjects(articles, ["id"]);

  return (
    <Table hasActions data={data} columns={Object.keys(data[0] as Article)} />
  );
};

export default Content;
