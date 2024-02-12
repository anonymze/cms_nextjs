"use client"

import { Inter } from "next/font/google";
import { cn } from "@/utils/libs/tailwind/helper";
import { useThemeStore } from "@/contexts/store_ui_context";
import "@/styles/globals.css";
import type { PropsWithChildren } from "react";

const fontSans = Inter({
	subsets: ["latin"],
});

export default function RootLayout({ children }: PropsWithChildren) {
	const theme = useThemeStore((state) => state.theme);

	return (
		<html lang="fr" className={theme}>
			<body className={cn("h-dvh", fontSans.className)}>{children}</body>
		</html>
	);
}
