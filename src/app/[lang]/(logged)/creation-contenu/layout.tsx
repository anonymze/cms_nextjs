import Header from "@/components/layout/Header";
import { LangContext } from "@/utils/providers";
import { useContext } from "react";
import { i18n } from "@/i18n/translations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My little CMS",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	const lang = useContext(LangContext);
	return (
		<>
			<Header>
				<h1>{i18n[lang]("CONTENT_CREATION")}</h1>
			</Header>
			{children}
		</>
	);
}
