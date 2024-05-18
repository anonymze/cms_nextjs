import App from "@/App";
import { Inter } from "next/font/google";
import { cn } from "@/utils/libs/tailwind/helper";
import { Toaster } from "@/components/ui/toaster/Sonner";
import { Providers } from "@/utils/providers";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import type { PageParamsI18n } from "@/types/i18n";

const fontSans = Inter({
  subsets: ["latin"],
  // prevent mismatch id with ssr
  preload: true,
});

// export it and nextjs handle it
export const metadata: Metadata = {
  title: "My litte CMS",
};

export default function RootLayout({
  children,
  params: { lang },
}: PropsWithChildren & PageParamsI18n) {
  return (
    <App lang={lang}>
      <body className={cn("h-dvh", fontSans.className)}>
        <Providers lang={lang}>
          {children}
          <Toaster duration={4000} />
        </Providers>
      </body>
    </App>
  );
}
