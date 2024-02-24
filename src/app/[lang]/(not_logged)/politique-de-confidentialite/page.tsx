import { i18n } from "@/i18n/translations";
import type { PageParamsI18n } from "@/types/i18n";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({ params: { lang } }: PageParamsI18n) {
  return (
    <div className="p-6">
      <Link href="/dashboard">
        <ArrowLeft className="size-8" />
      </Link>
      <h1 className="my-3">{i18n[lang]("PRIVACY_POLICY")}</h1>
      <p className="mb-4">{i18n[lang]("PRIVACY_POLICY_TITLE")}</p>
      <ol className="list-decimal px-8 [&>li]:py-2 [&>li]:text-balance">
        <li>{i18n[lang]("PRIVACY_POLICY_CONTENT_1")}</li>
        <li>{i18n[lang]("PRIVACY_POLICY_CONTENT_2")}</li>
        <li>{i18n[lang]("PRIVACY_POLICY_CONTENT_3")}</li>
        <li>{i18n[lang]("PRIVACY_POLICY_CONTENT_4")}</li>
        <li>{i18n[lang]("PRIVACY_POLICY_CONTENT_5")}</li>
        <li>{i18n[lang]("PRIVACY_POLICY_CONTENT_6")}</li>
        <li>{i18n[lang]("PRIVACY_POLICY_CONTENT_7")}</li>
      </ol>
    </div>
  );
}
