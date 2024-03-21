"use client";

import { cn } from "@/utils/libs/tailwind/helper";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import { mainNavigation, optionsNavigation } from "./navLinks";

export default function SideNavbar() {
	const lang = useContext(LangContext);
	const router = useRouter();
	const { signOut } = useClerk();

	return (
		<div className="flex grow flex-col gap-y-5 h-full overflow-y-auto">
			<div className="flex h-16 shrink-0 items-center">
				<img
					className="h-8 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
					alt="Your Company"
				/>
			</div>
			<nav className="flex flex-1 flex-col">
				<ul className="flex flex-1 flex-col gap-y-7">
					<li>
						<div className="text-xs font-semibold leading-6 text-gray-400">{i18n[lang]("CONTENT")}</div>
						<menu className="mt-2 space-y-1">
							{mainNavigation(lang).map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className={cn(
											item.current ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
											"group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
										)}
									>
										<item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
										{item.name}
										{item.count ? (
											<span
												className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
												aria-hidden="true"
											>
												{item.count}
											</span>
										) : null}
									</Link>
								</li>
							))}
						</menu>
					</li>
					<li>
						<div className="text-xs font-semibold leading-6 text-gray-400">{i18n[lang]("ADVANCED")}</div>
						<menu className="mt-2 space-y-1">
							{optionsNavigation(lang).map((team) => (
								<li key={team.name}>
									<Link
										href={team.href}
										className={cn(
											team.current ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
											"group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
										)}
									>
										<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
											{team.initial}
										</span>
										<span className="truncate">{team.name}</span>
									</Link>
								</li>
							))}
						</menu>
					</li>
					<li className="mt-auto">
						<Button
							onClick={() => signOut(() => router.push(`/${lang}/login`))}
							className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-white"
						>
							<img
								className="h-8 w-8 rounded-full bg-gray-800"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
							<span className="sr-only">{i18n[lang]("YOUR_PROFILE")}</span>
							<span aria-hidden="true">Tom Cook</span>
						</Button>
					</li>
				</ul>
			</nav>
		</div>
	);
}
