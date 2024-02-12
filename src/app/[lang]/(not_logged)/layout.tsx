import App from "@/App";
import { Inter } from "next/font/google";
import { cn } from "@/utils/libs/tailwind/helper";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster/Sonner";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const fontSans = Inter({
  subsets: ["latin"],
});

// export it and nextjs handle it
export const metadata: Metadata = {
  title: "CMS 'XXX'",
  description:
    "Le CMS 'XXX' est puissant, rapide, et surtout accessible. Il s'adapte à tous les besoins, qu'il s'agisse de sites web, d'applications mobiles ou de tout autre projet numérique. L'interface de contenu est facile à utiliser et à personnaliser pour répondre à vos besoins. Que vous soyez un développeur expérimenté ou un simple utilisateur, notre CMS est conçu pour vous aider à créer une expérience numérique agréable.",
};

export default function RootLayout({ children, params: { lang } }: any) {
  return (
      <App lang={"en"}>
        <body className={cn("h-dvh", fontSans.className)}>
          {children}
          <Toaster duration={4000} />
        </body>
      </App>
  );
}
