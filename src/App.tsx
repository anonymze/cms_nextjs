"use client";
import { useThemeStore } from "./contexts/store_ui_context";
import { type PropsWithChildren } from "react";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ children }: PropsWithChildren) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ClerkProvider>
      <html lang="fr" className={theme}>
        {children}
      </html>
    </ClerkProvider>
  );
}
