import ActionsButtons from "@/components/ui/ActionsButtons";
import Header from "@/components/layout/Header";
import { Suspense } from "react";
import { i18n } from "@/i18n/translations";
import type { Metadata } from "next";
import type { PageParamsI18n } from "@/types/i18n";

export const metadata: Metadata = {
  title: "My little CMS",
};
export default function Layout({ children, params: { lang } }: { children: React.ReactNode } & PageParamsI18n) {
	return (
		<>
			<Header>
				<h1>{i18n[lang]("MEDIA_LIBRARY")}</h1>
				<ActionsButtons actionPopup={{ label: i18n[lang]("ADD") }} />
			</Header>
			<Suspense fallback={"!!!!!"}> {children}</Suspense>
		</>
	);
}
