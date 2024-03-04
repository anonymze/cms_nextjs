"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../../../components/ui/table/Table";
import { getKeysTypedObject } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { deletePageQuery, getPagesQuery } from "@/api/queries/pageQueries";
import { LangContext } from "@/utils/providers";
import { useContext } from "react";
import { i18n } from "@/i18n/translations";
import type { Page } from "@prisma/client";

export default function Content() {
	const lang = useContext(LangContext);
	const searchParams = useSearchParams();
	const router = useRouter();

	const { data: pages, isLoading, isFetching } = useQuery({
		queryKey: ["pages", { page: searchParams.get("page"), lang }],
		queryFn: getPagesQuery,
	});

	const deleteMutation = useMutation({
		mutationFn: deletePageQuery,
		mutationKey: ["pages"],
		meta: {
			action: "delete",
			message: i18n[lang]("PAGE_DELETED"),
		},
	});

	if (isLoading || isFetching) return <div>{i18n[lang]("LOADING")}...</div>;

	if (!pages || !pages[0]) {
		return <div>{i18n[lang]("NO_DATA")}...</div>;
	}

	// for now the type with keys is not really useful,
	// but keep it ! We will upgrade the Table component when i'm better with Typescript
	return (
		<Table
			actions={[
				{
					label: i18n[lang]("EDIT"),
					action: (entity: Page) => {
						router.push(`/creation-contenu/page/${entity.uuid}`);
					},
				},

				{
					label: i18n[lang]("DELETE"),
					action: (entity: Page) => {
						deleteMutation.mutate(entity.uuid);
					},
				},
			]}
			isLoading={false}
			data={pages}
			columns={getKeysTypedObject(pages[0])}
		/>
	);
}
