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

      <h1 className="my-3">{i18n[lang]("CGU")}</h1>
      <p className="mb-4">
        En utilisant notre système de gestion de contenu (CMS), vous acceptez et
        vous engagez à respecter les conditions générales d&lsquo;utilisation
        suivantes :
      </p>
      <ol className="list-decimal px-8 [&>li]:py-2 [&>li]:text-balance">
        <li>
          <span className="underline">
            Respect des informations d&lsquo;authentification
          </span>{" "}
          : Vous vous engagez à ne pas divulguer, ne pas partager, ne pas
          reproduire, ne pas modifier, et ne pas utiliser à des fins autres que
          celles prévues par le présent contrat, les informations
          d&lsquo;authentification fournies par notre CMS
        </li>
        <li>
          <span className="underline">Responsabilité</span> : Vous assumez toute
          responsabilité pour l&lsquo;utilisation de votre compte. Nous ne
          sommes pas responsables de tout dommage résultant de votre
          comportement sur notre plateforme.
        </li>
        <li>
          <span className="underline">Modifications des conditions</span> : Nous
          avons le droit de modifier ces conditions à tout moment. Les
          modifications seront immédiatement applicables et devront être
          acceptées par vous pour continuer à utiliser notre CMS.
        </li>
        <li>
          <span className="underline">Loi applicable</span> : Tout litige lié à
          l&lsquo;utilisation de notre CMS sera régi par la loi française.
        </li>
        <li>
          <span className="underline">Droit de retrait</span> : Vous pouvez
          retirer votre accord à tout moment en supprimant votre compte. Nous
          pouvons également retirer votre accès à notre CMS à tout moment sans
          préavis.
        </li>
        <li>
          <span className="underline">Confidentialité</span> : Nous nous
          engageons à protéger vos données personnelles. Nous ne divulguerons
          pas vos informations d&lsquo;authentification à d&lsquo;autres
          entités. En utilisant notre CMS, vous acceptez et vous engagez à
          respecter les conditions générales d&lsquo;utilisation ci-dessus. Si
          vous n&lsquo;acceptez pas ces conditions, veuillez ne pas utiliser
          notre CMS.
        </li>
      </ol>
    </div>
  );
}
