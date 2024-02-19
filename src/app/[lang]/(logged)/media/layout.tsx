import ActionsButtons from "@/components/ActionsButtons";
import Header from "@/components/layout/Header";
import { Suspense } from "react";
import type { Metadata } from "next";
import type { PageParamsI18n } from "@/types/i18n";
import { i18n } from "@/i18n/translations";

// export it and nextjs handle it
export const metadata: Metadata = {
	title: "CMS Nextjs",
	description: "Créé par Yann M.",
};

export default function Layout({ children, params: { lang } }: { children: React.ReactNode } & PageParamsI18n) {
	return (
		<>
			<Header>
				<h1>{i18n[lang]("MEDIA_LIBRARY")}</h1>
				<ActionsButtons actionPopup={{ label: i18n[lang]("ADD") }} />
			</Header>
			<Suspense fallback={<div>{i18n[lang]("LOADING")}...??!!!</div>}>{children}</Suspense>
		</>
	);
}
