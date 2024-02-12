"use client";

import { Activity } from "lucide-react";
import { useSearchParams } from "next/navigation";
import VerificationCodeForm from "./_forms/VerificationCodeForm";
import AuthForm, { type AuthServices } from "./_forms/AuthForm";

export default function Content(props: AuthServices) {
	const searchParams = useSearchParams();

	return (
		<div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="h-full hidden flex-col bg-muted p-10 text-white lg:flex dark:border-r">
				<div className="flex items-center text-md font-medium">
					<Activity className="mr-1" />
					Powered by Clerk
				</div>
				<div className="mt-auto">
					<blockquote className="space-y-2">
						<p className="text-base">
							&ldquo;Bienvenue dans votre monde. Ici vous pourrez créer à votre guise et sans
							limite. Découvrez la simplicité d&apos;un gestionnaire de contenu affiné pour
							vous.&rdquo;
						</p>
						<footer className="text-sm">Yann M. | Ano</footer>
					</blockquote>
				</div>
			</div>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-lg font-semibold tracking-tight">Authentification</h1>
					<p className="text-base text-muted-foreground">
						{searchParams.get("verifying") ? (
							"Entrez le code de vérification reçu"
						) : (
							<>
								Entrez votre email et mot de passe
								<br />
								<span className="inline-block mt-1 text-xs leading-1">
									(si vous n&lsquo;avez pas de compte, il sera créé automatiquement et devra ensuite
									être validé par un administrateur)
								</span>
							</>
						)}
					</p>
				</div>
				{searchParams.get("verifying") ? <VerificationCodeForm /> : <AuthForm {...props} />}
			</div>
		</div>
	);
}
