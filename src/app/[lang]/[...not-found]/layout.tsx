"use client";

import { Inter } from "next/font/google";
import { cn } from "@/utils/libs/tailwind/helper";
import { useThemeStore } from "@/contexts/store_ui_context";
import type { PropsWithChildren } from "react";
import type { PageParamsI18n } from "@/types/i18n";
import "@/styles/globals.css";

const fontSans = Inter({
	subsets: ["latin"],
});

export default function RootLayout({ children, params: { lang } }: PropsWithChildren & PageParamsI18n) {
	const theme = useThemeStore((state) => state.theme);

	return (
		<html lang={lang} className={theme}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body className={cn("h-dvh", fontSans.className)}>{children}</body>
		</html>
	);
}
