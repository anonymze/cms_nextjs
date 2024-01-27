"use client";

import { createUserQuery } from "@/api/queries/userQueries";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Input";
import { Label } from "@/components/ui/Form/Label";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function VerificationCodeForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	const { isLoaded: isClerkLoaded, signUp } = useSignUp();

	const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setIsLoading(true);

		if (!isClerkLoaded) {
			return;
		}

		const code = ev.currentTarget.code.value;

		// verify the code in email
		signUp
			.attemptVerification({
				strategy: "email_code",
				code: code || "",
			})
			.then(async (result) => {
				if (result.status !== "complete") {
				}

				await createUserQuery({
					clerkUserId: result.createdUserId || "",
				});

				router.push("/login?info=created");
			})
			.catch((err) => {
				if (isClerkAPIResponseError(err)) {
					toast.error(err.errors?.[0]?.message);
				} else if (err instanceof Error) {
					toast.error(err.message);
				}

				setIsLoading(false);
			});
	};

	return (
		<form onSubmit={onSubmit} autoComplete="off">
			<div className="grid gap-2">
				<div className="grid gap-1">
					<Label className="sr-only" htmlFor="code">
						Code de vérification
					</Label>
					<Input
						required
						name="code"
						id="code"
						placeholder="123456"
						type="text"
						autoCorrect="off"
						disabled={isLoading}
					/>
				</div>
				<Button disabled={isLoading}>
					{isLoading && <SpinnerLoader className="mr-2" />}
					Valider le code
				</Button>
				<Button type="button" onClick={() => router.back()} fill={false} disabled={isLoading}>
					Annuler
				</Button>
			</div>
		</form>
	);
}
