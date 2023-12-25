import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Nextjs",
  description: "Créé par Yann M.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <h1>GESTIO</h1>
      </Header>
      {children}
    </>
  );
}
