"use client";

import { useThemeStore } from "./contexts/store_ui_context";
import { I18n } from "./types/i18n";
import { type PropsWithChildren } from "react";
import "@/styles/globals.css";

export default function App({
  lang,
  children,
}: PropsWithChildren & { lang: I18n }) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <html lang={lang} className={theme}>
      {children}
    </html>
  );
}
