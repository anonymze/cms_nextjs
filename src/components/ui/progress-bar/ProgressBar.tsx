"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import nprogress from "nprogress";
import type { ComponentProps } from "react";
import "nprogress/nprogress.css";

nprogress.configure({ minimum: 0.3, showSpinner: false, trickleSpeed: 800, trickleRate: 0.04 });

export const ProgressLink = ({ href, className, children }: ComponentProps<typeof Link>) => {
	const {routerPush} = useProgressLinkProgrammaticly();

	return (
		<Link
			className={className}
			onClick={async (e) => {
				e.preventDefault();
				routerPush(href.toString());
			}}
			href={href}
		>
			{children}
		</Link>
	);
};

export const useProgressLinkProgrammaticly = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		if (isPending) {
			nprogress.start();
		}

		if (!isPending) {
			nprogress.done();
		}

		return () => {
			// weird it is the opposite of the previous condition, i don't get it...
			if (isPending) {
				nprogress.done();
			}
		};
	}, [isPending]);

	return {
		// router push is a react transition, we can use startTransition freely to detect when it is finished
		routerPush: (href: string) => {
			startTransition(() => {
				router.push(href);
			});
		},
	};
};