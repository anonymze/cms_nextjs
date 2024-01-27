import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page() {
	return (
		<div className="p-6">
			<Link href="/dashboard">
				<ArrowLeft className="size-8" />
			</Link>
			<h1 className="my-3">Politique de confidentialité.</h1>
			<p className="mb-4">
				En utilisant notre système de gestion de contenu (CMS), vous acceptez et vous engagez à
				respecter les conditions suivantes :
			</p>
			<ol className="list-decimal px-8 [&>li]:py-2 [&>li]:text-balance">
				<li>
					<span className="underline">Collecte et Utilisation des Données</span> : Nous collectons
					et utilisons uniquement les informations nécessaires pour vous fournir notre service CMS.
					Cela comprend les informations d&lsquo;identification pour l&lsquo;accès au CMS.
				</li>
				<li>
					<span className="underline">Sécurité des Données</span> : Nous utilisons des mesures de
					sécurité appropriées pour protéger vos informations d&lsquo;identification et
					d&lsquo;autres données sensibles. Nous nous engageons à ne pas divulguer ces informations
					à des tiers.
				</li>
				<li>
					<span className="underline">Cookies</span> : Nous pouvons utiliser des cookies pour
					améliorer votre expérience d&lsquo;utilisation de notre CMS. Ces cookies ne sont pas
					utilisés pour suivre votre activité en ligne sur d&lsquo;autres sites.
				</li>
				<li>
					<span className="underline">Publication de contenu</span> : Tout contenu que vous publiez
					sur notre CMS reste votre propriété. Cependant, vous vous engagez à ne pas divulguer
					d&lsquo;informations d&lsquo;identification ou d&lsquo;autres informations sensibles.
				</li>
				<li>
					<span className="underline">Modifications de la Politique de Confidentialité</span> : Nous
					avons le droit de modifier cette politique de confidentialité à tout moment. Les
					modifications seront immédiatement applicables et devront être acceptées par vous pour
					continuer à utiliser notre CMS.
				</li>
				<li>
					<span className="underline">Loi applicable</span> : Tout litige lié à l&lsquo;utilisation
					de notre CMS sera régi par la loi française.
				</li>
				<li>
					<span className="underline">Droit de Retrait</span> : Vous pouvez retirer votre accord à
					tout moment en supprimant votre compte. Nous pouvons également retirer votre accès à notre
					CMS à tout moment sans préavis.
				</li>
			</ol>
		</div>
	);
}
