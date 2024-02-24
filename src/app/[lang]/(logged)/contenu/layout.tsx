import Header from "@/components/layout/Header";
import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "My little CMS",
};

export default function Layout({ children, params : { lang } }: PropsWithChildren & PageParamsI18n) {
	return (
		<>
			<Header>
				<h1>{i18n[lang]('CONTENT_MANAGEMENT')}</h1>
			</Header>
			{children}
		</>
	);
}
