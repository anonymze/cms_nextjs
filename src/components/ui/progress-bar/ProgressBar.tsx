"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useLayoutEffect, useState } from "react";
import { createContext, useContext, useSyncExternalStore } from "react";
import nprogress from "nprogress";
import type { ComponentProps } from "react";
import "nprogress/nprogress.css";

export const ProgressContext = createContext({ start: () => {}, done: () => {} });

export const ProgressProvider = ({ children }) => {
	return (
		<ProgressContext.Provider value={{ start: nprogress.start, done: nprogress.done }}>
			{children}
		</ProgressContext.Provider>
	);
};

// we give an empty registration because we don't use it in this case (need to be outside of the hook to prevent infine loop / re-execution)
const register = () => () => {};

export const useProgress = () => {
	const { start, done } = useContext(ProgressContext);

	// becareful the returns need to be re-render safe to prevend infinite loop / re-execution
	const isServer = useSyncExternalStore(
		register,
		// returned if on client
		() => false,
		// returned if on server
		() => true,
	);

	// you can use safely start and done in your components, we will make sure it is not called on the server
	return { start: isServer ? () => {} : start, done: isServer ? () => {} : done };
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
