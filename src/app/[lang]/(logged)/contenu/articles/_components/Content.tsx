"use client";

import { deleteArticleQuery, getArticlesQuery } from "@/api/queries/articleQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../../../components/ui/table/Table";
import { getKeysTypedObject } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import type { Article } from "@prisma/client";

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

	if (!articles || !articles[0]) {
		return <div>Aucune donnée...</div>;
	}

	// for now the type with keys is not really useful,
	// but keep it ! We will upgrade the Table component when i'm better with Typescript
	return (
		<Table
			actions={[
				{
					label: "Modifier",
					action: (entity: Article) => {
						router.push(`/creation-contenu/article/${entity.uuid}`);
					},
				},

				{
					label: "Supprimer",
					action: (entity: Article) => {
						deleteMutation.mutate(entity.uuid);
					},
				},
			]}
			isLoading={false}
			data={articles}
			columns={getKeysTypedObject(articles[0])}
		/>
	);
}
