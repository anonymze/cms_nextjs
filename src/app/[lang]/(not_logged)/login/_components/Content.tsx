"use client";

import { Activity } from "lucide-react";
import { useSearchParams } from "next/navigation";
import VerificationCodeForm from "./_forms/VerificationCodeForm";
import AuthForm, { type AuthServices } from "./_forms/AuthForm";
import { i18n } from "@/i18n/translations";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";

export default function Content(props: AuthServices) {
	const lang = useContext(LangContext);
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
							{i18n[lang]("WELCOME_TO_YOUR_WORLD")}
						</p>
						<footer className="text-sm">Yann M. | Ano</footer>
					</blockquote>
				</div>
			</div>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-lg font-semibold tracking-tight">{i18n[lang]("AUTHENTICATION")}</h1>
					<p className="text-base text-muted-foreground">
						{searchParams.get("verifying") ? (
							<>{i18n[lang]("ENTER_VERIFICATION_CODE")}</>
						) : (
							<>
								{i18n[lang]("ENTER_EMAIL_PASSWORD")}
								<br />
								<span className="inline-block mt-1 text-xs leading-1">
									({i18n[lang]("ACCOUNT_CREATION_AUTOMATIC")})
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
