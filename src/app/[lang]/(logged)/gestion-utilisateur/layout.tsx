import Header from "@/components/layout/Header";
import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Nextjs",
  description: "Créé par Yann M.",
};

export default function Layout({
  children,
  params: { lang },
}: { children: React.ReactNode } & PageParamsI18n) {
  return (
    <>
      <Header>
        <h1>{i18n[lang]("USER_MANAGEMENT")}</h1>
      </Header>
      {children}
    </>
  );
}
