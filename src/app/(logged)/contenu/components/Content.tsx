"use client";

import { deleteArticleQuery, getArticlesQuery } from "@/api/queries/articleQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../components/ui/Table/Table";
import { getKeysTypedObject } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";

export default function Content() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles", { page: searchParams.get("page") }],
    queryFn: getArticlesQuery,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteArticleQuery,
    mutationKey: ["articles"],
    meta: {
      action: "delete",
      message: "Article supprimé",
    },
  });

  if (isLoading) return <div>Chargement...</div>;
  

  if (!articles || !articles.length) {
    return <div>Aucune donnée...</div>;
  }

  // for now the type with keys is not really useful, but keep it ! We will upgrade the Table component when i'm better with typescript
  return (
    <Table
      actions={[
        {
          label: "Modifier",
          action: (uuid) => {
            router.push(`/creation-contenu/article/${uuid}`);
          },
        },

        {
          label: "Supprimer",
          action: (uuid: string) => {
            deleteMutation.mutate(uuid);
          },
        },
      ]}
      isLoading={false}
      data={articles}
      columns={getKeysTypedObject(articles[0]!)}
    />
  );
}
