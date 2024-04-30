"use client";

import FormPage from "../../_components/Form";
import { useQuery } from "@tanstack/react-query";
import { ContentFormI18n } from "@/components/ContentFormI18n";
import { getPageQuery } from "@/api/queries/pageQueries";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import type { Page } from "@prisma/client";

export default function Content({ uuid }: { uuid: Page["uuid"] }) {
	const lang = useContext(LangContext);
	const {
		data: page,
		isLoading,
		isError
	} = useQuery({
		queryKey: ["page", { slug: uuid }],
		queryFn: getPageQuery,
	});

	if (isLoading) return <div>{i18n[lang]("LOADING")}...</div>;
	if (isError) return <div>{i18n[lang]("NO_DATA")}</div>

	return (
		<ContentFormI18n>
			<FormPage page={page} />
		</ContentFormI18n>
	);
}
