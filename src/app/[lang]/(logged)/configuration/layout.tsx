import Header from "@/components/layout/Header";
import { i18n } from "@/i18n/translations";
import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import type { PageParamsI18n } from "@/types/i18n";

export const metadata: Metadata = {
  title: "My little CMS",
};

export default function Layout({
  children,
  params: { lang },
}: PropsWithChildren & PageParamsI18n) {
  return (
    <>
      <Header>
        <h1>{i18n[lang]("PARAMETERS")}</h1>
      </Header>
      {children}
    </>
  );
}
