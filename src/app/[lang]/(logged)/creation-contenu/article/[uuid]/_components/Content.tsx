"use client";

import FormArticle from "../../_components/Form";
import { getArticleQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";
import { ContentFormI18n } from "@/components/ContentFormI18n";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import type { Article } from "@prisma/client";

export default function Content({ uuid }: { uuid: Article["uuid"] }) {
	const lang = useContext(LangContext);

	const { data: article, isError } = useQuery({
		queryKey: ["article", { slug: uuid }],
		queryFn: getArticleQuery,
	});

	if (isError) return <div>{i18n[lang]("NO_DATA")}</div>

	return (
		<ContentFormI18n>
			<FormArticle article={article} />
		</ContentFormI18n>
	);
}
