"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import nprogress from "nprogress";
import type { ComponentProps } from "react";
import "nprogress/nprogress.css";

nprogress.configure({ minimum: 0.4 });

// we give an empty registration because we don't use it in this case (need to be outside of the hook to prevent infine loop / re-execution)
const register = () => () => {};
const nprogressClient = { start: nprogress.start, done: nprogress.done };
const nprogressServer = { start: () => {}, done: () => {} };

export const useProgress = () => {
	// becareful the returns need to be re-render safe to prevend infinite loop / re-execution
	const safeExec = useSyncExternalStore(
		register,
		// returned if on client
		() => nprogressClient,
		// returned if on server
		() => nprogressServer,
	);

	// you can use safely start and done in your components, we will make sure it is not called on the server
	return { start: safeExec.start, done: safeExec.done };
};

export function ProgressLink({ href, children }: ComponentProps<typeof Link>) {
	const router = useRouter();
	const { start, done } = useProgress();
	const [isNavigating, setIsNavigating] = useState<boolean | null>(null);

	useEffect(() => {
		if (isNavigating) {
			start();
		}

		if (isNavigating === false) {
			done();
		}
	}, [isNavigating]);

	return (
		<Link
			onClick={async (e) => {
				e.preventDefault();
				setIsNavigating(true);

				// router push is a react transition, we can use startTransition freely to detect when it is finished
				startTransition(() => {
					router.push(href.toString());
					setIsNavigating(false);
				});
			}}
			href={href}
		>
			{children}
		</Link>
	);
}
