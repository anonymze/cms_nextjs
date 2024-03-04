"use client";

import { deleteArticleQuery, getArticlesQuery } from "@/api/queries/articleQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../../../components/ui/table/Table";
import { getKeysTypedObject } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { LangContext } from "@/utils/providers";
import { useContext } from "react";
import { i18n } from "@/i18n/translations";
import type { Article } from "@prisma/client";

export default function Content() {
	const lang = useContext(LangContext);
	const searchParams = useSearchParams();
	const router = useRouter();

	const { data: articles, isLoading, isFetching } = useQuery({
		queryKey: ["articles", { page: searchParams.get("page"), lang }],
		queryFn: getArticlesQuery,
	});

	const deleteMutation = useMutation({
		mutationFn: deleteArticleQuery,
		mutationKey: ["articles"],
		meta: {
			action: "delete",
			message: i18n[lang]("ARTICLE_DELETED"),
		},
	});

	if (isLoading || isFetching) return <div>{i18n[lang]("LOADING")}...</div>;

	if (!articles || !articles[0]) {
		return <div>{i18n[lang]("NO_DATA")}...</div>;
	}

	// for now the type with keys is not really useful,
	// but keep it ! We will upgrade the Table component when i'm better with Typescript
	return (
		<Table
			actions={[
				{
					label: i18n[lang]("EDIT"),
					action: (entity: Article) => {
						router.push(`/creation-contenu/article/${entity.uuid}`);
					},
				},

				{
					label: i18n[lang]("DELETE"),
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
