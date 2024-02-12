"use client";

import FormArticle from "../../_components/Form";
import { getArticleQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";
import { ContentFormI18n } from "@/components/ContentFormI18n";
import type { Article } from "@prisma/client";

export default function Content({ uuid }: { uuid: Article["uuid"] }) {
	const { data: article, isLoading } = useQuery({
		queryKey: ["article", { slug: uuid }],
		queryFn: getArticleQuery,
	});

	if (isLoading) return <div>Chargement...</div>;

	if (!article) {
		return <div>Article non trouvé</div>;
	}

	return (
		<ContentFormI18n>
			<FormArticle article={article} />
		</ContentFormI18n>
	);
}
