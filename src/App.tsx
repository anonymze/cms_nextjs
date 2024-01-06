"use client";

import { useThemeStore } from "./contexts/store_ui_context";
import { Suspense, type PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { SpinnerLoader } from "./components/ui/Loader/Loader";
import { NavigationEvents } from "./components/NavigationEvents";
import "@/styles/globals.css";

export default function App({ children }: PropsWithChildren) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ClerkProvider>
      <html lang="fr" className={theme}>
        {children}
        <Suspense fallback={<SpinnerLoader />}>
          <NavigationEvents />
        </Suspense>
      </html>
    </ClerkProvider>
  );
}
