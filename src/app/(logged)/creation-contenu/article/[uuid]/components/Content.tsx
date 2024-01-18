"use client";

import FormArticle from "../../components/Form";
import { getArticleQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";
import { ContentFormI18n } from "@/components/ContentFormI18n";
import type { Article } from "@prisma/client";

export default function Content({ uuid }: { uuid: Article["uuid"] }) {
  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["article", { uuid }],
    queryFn: getArticleQuery,
  });

  if (!isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Erreur...</div>;
  }

  if (!article) {
    return <div>Article non trouvé</div>;
  }

  return (
    <ContentFormI18n>
      <FormArticle article={article} />
    </ContentFormI18n>
  );
}
