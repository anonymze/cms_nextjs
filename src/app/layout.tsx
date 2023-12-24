import App from "@/App";
import Layout from "@/components/layout/Layout";
import { Inter } from "next/font/google";
import { cn } from "@/utils/libs/shadcn";
import { Providers } from "@/utils/libs/providers_react_query";
import { Toaster } from "@/components/ui/Toaster/Toaster";
import type { Metadata } from "next";

const fontSans = Inter({
  subsets: ["latin"],
});

// export it and nextjs handle it
export const metadata: Metadata = {
  title: "CMS 'XXX'",
  description:
    "Le CMS 'XXX' est puissant, rapide, et surtout accessible. Il s'adapte à tous les besoins, qu'il s'agisse de sites web, d'applications mobiles ou de tout autre projet numérique. L'interface de contenu est facile à utiliser et à personnaliser pour répondre à vos besoins. Que vous soyez un développeur expérimenté ou un simple utilisateur, notre CMS est conçu pour vous aider à créer une expérience numérique agréable.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <body className={cn("h-screen", fontSans.className)}>
        <Layout>
          <Providers>{children}</Providers>
        </Layout>
        <Toaster />
      </body>
    </App>
  );
}
