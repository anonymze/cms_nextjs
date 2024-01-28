"use client";

import FormPage from "../../components/Form";
import { useQuery } from "@tanstack/react-query";
import { ContentFormI18n } from "@/components/ContentFormI18n";
import { getPageQuery } from "@/api/queries/pageQueries";
import type { Page } from "@prisma/client";

export default function Content({ uuid }: { uuid: Page["uuid"] }) {
	const {
		data: page,
		isLoading,
	} = useQuery({
		queryKey: ["page", { slug: uuid }],
		queryFn: getPageQuery,
	});

	if (isLoading) return <div>Chargement...</div>;

	if (!page) {
		return <div>Page non trouvée</div>;
	}

	return (
		<ContentFormI18n>
			<FormPage page={page} />
		</ContentFormI18n>
	);
}
