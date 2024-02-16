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
  title: "CMS 'XXX'",
  description:
    "Le CMS 'XXX' est puissant, rapide, et surtout accessible. Il s'adapte à tous les besoins, qu'il s'agisse de sites web, d'applications mobiles ou de tout autre projet numérique. L'interface de contenu est facile à utiliser et à personnaliser pour répondre à vos besoins. Que vous soyez un développeur expérimenté ou un simple utilisateur, notre CMS est conçu pour vous aider à créer une expérience numérique agréable.",
};

export default function RootLayout({
  children,
  params: { lang },
}: PropsWithChildren & PageParamsI18n) {
  return (
    <App lang={lang}>
      <body className={cn("h-dvh", fontSans.className)}>
        <Providers lang={lang}>{children}</Providers>
        <Toaster duration={4000} />
      </body>
    </App>
  );
}
