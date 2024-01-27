// we use this page if we need to log the user in the front (like creating a clerk's session)
"use client";

import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { isClerkAPIResponseError, useClerk, useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Content() {
	const { signOut } = useClerk();
	const { signIn, setActive } = useSignIn();
	const params = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		if (!signIn || !setActive) return;

		const token = params.get("token");

		// we have to use a async function here because we can't use async/await in useEffect
		const asyncCall = async () => {
			try {
				// we log out in case
				await signOut();

				// create a signIn with the token from the magic link in server side, note that you need to use the "ticket" strategy
				const res = await signIn.create({
					strategy: "ticket",
					ticket: token || "",
				});

				await setActive({
					session: res.createdSessionId,
				});

				router.replace("/dashboard");
			} catch (err) {
				// some weird cases can happen here, we don't want to display the error to the user, we just redirect him to the login page
				if (isClerkAPIResponseError(err)) {
					// console.log(err.errors?.[0]?.message);
				} else if (err instanceof Error) {
					// console.log(err.message);
				}

				router.replace("/login");
			}
		};

		asyncCall();
	}, [signIn, setActive]);

	return (
		<div className="grid place-items-center h-full">
			<SpinnerLoader large />
		</div>
	);
}
