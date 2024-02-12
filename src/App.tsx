"use client";

import { useThemeStore } from "./contexts/store_ui_context";
import { ClerkProvider } from "@clerk/nextjs";
import { type PropsWithChildren } from "react";
import "@/styles/globals.css";

type PropsWithChildrenAndLang = PropsWithChildren & {
  lang: string
}

export default function App({ lang = "en", children }: PropsWithChildrenAndLang) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ClerkProvider>
      <html lang={lang} className={theme}>
        {children}
      </html>
    </ClerkProvider>
  );
}
