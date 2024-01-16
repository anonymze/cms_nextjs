"use client";

import { getArticlesQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";
import Table from "../../../../components/ui/Table/Table";
import { getKeysTypedObject } from "@/utils/helper";

export default function Content() {
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticlesQuery,
  });

  if (!articles) {
    return <div>Chargement...</div>;
  }

  if (!articles.length) {
    return <div>Aucune donnée...</div>;
  }

  // for now the type with keys is not really useful, but keep it ! We will upgrade the Table component when i'm better with typescript
  return <Table data={articles} columns={getKeysTypedObject(articles[0]!)} />;
};
