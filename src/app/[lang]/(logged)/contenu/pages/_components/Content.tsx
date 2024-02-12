"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../../../components/ui/table/Table";
import { getKeysTypedObject } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { deletePageQuery, getPagesQuery } from "@/api/queries/pageQueries";
import type { Page } from "@prisma/client";

export default function Content() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const { data: pages, isLoading } = useQuery({
		queryKey: ["pages", { page: searchParams.get("page") }],
		queryFn: getPagesQuery,
	});

	const deleteMutation = useMutation({
		mutationFn: deletePageQuery,
		mutationKey: ["pages"],
		meta: {
			action: "delete",
			message: "Page supprimée",
		},
	});

	if (isLoading) return <div>Chargement...</div>;

	if (!pages || !pages[0]) {
		return <div>Aucune donnée...</div>;
	}

	// for now the type with keys is not really useful,
	// but keep it ! We will upgrade the Table component when i'm better with Typescript
	return (
		<Table
			actions={[
				{
					label: "Modifier",
					action: (entity: Page) => {
						router.push(`/creation-contenu/page/${entity.uuid}`);
					},
				},

				{
					label: "Supprimer",
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
