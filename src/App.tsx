"use client";;
import { useThemeStore } from "./contexts/store_ui_context";
import { ClerkProvider } from "@clerk/nextjs";
import { type PropsWithChildren } from "react";
import { setLocaleLangFromNavigator } from "./utils/web_api/locale_lang";
import "@/styles/globals.css";

export default function App({ children }: PropsWithChildren) {
	const theme = useThemeStore((state) => state.theme);
	// set the language from the navigator if it's not already set
	setLocaleLangFromNavigator();

	return (
		<ClerkProvider>
			<html lang="fr" className={theme}>
				{children}
			</html>
		</ClerkProvider>
	);
}
