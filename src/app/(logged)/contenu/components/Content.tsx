"use client";

import { getArticlesQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";
import Table from "../../../../components/ui/Table/Table";
import { getKeysTypedObject } from "@/utils/helper";
import { useSearchParams } from "next/navigation";

export default function Content() {
  const searchParams = useSearchParams();
  
  const { data: articles } = useQuery({
    queryKey: ["articles", { page: searchParams.get("page") }],
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
