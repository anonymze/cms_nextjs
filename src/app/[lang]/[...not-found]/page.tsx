"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/libs/tailwind/helper";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page({ params : { lang } }) {
    const router = useRouter();
	return (
		<div className="flex flex-col min-h-screen">
			<header className="p-8">
				<Button onClick={() => router.back()}>
					<ArrowLeftIcon className="h-6 w-6" />
				</Button>
			</header>
			<main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
					<AlertCircleIcon className="h-8 w-8 mx-auto mb-1 text-gray-400" />
					404
				</h1>
				<p className="mt-2 text-base text-gray-500 dark:text-gray-400">
					Désolé, la page que vous recherchez n'existe pas
				</p>
				<div className="mt-6">
					<Link
						className={cn(
                            "inline-flex items-center justify-center rounded-md",
                            "font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:pointer-events-none disabled:opacity-50 shadow",
                            "px-6 py-4 text-base",
                            "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
						href={`/${lang}/dashboard`}
					>
						Retourner à votre page d'accueil
					</Link>
				</div>
			</main>
			<footer className="h-14 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
				© {(new Date).getFullYear()} Anonnymze | Yann.
			</footer>
		</div>
	);
}

function AlertCircleIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Mountain !!!</title>
			<circle cx="12" cy="12" r="10" />
			<line x1="12" x2="12" y1="8" y2="12" />
			<line x1="12" x2="12.01" y1="16" y2="16" />
		</svg>
	);
}

function MountainIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Mountain</title>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		</svg>
	);
}
