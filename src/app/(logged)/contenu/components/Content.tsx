"use client";

import { getArticlesQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";
import Table from "../../../../components/Table/Table";
import type { Article } from "@prisma/client";

export default function Content() {
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

  return <Table data={articles} columns={Object.keys(articles[0] as Article)} />;
};
