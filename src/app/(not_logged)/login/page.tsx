import { cn } from "@/utils/libs/shadcn";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "./components/UserAuthForm";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Activity className="mr-1" />
            Powered by Clerk
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Bienvenue dans votre monde. Ici vous pourrez créer à votre guise et sans limite.
                Découvrez la simplicité d&apos;un gestionnaire de contenu affiné pour vous.&rdquo;
              </p>
              <footer className="text-sm">Yann M. | Ano</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Authentification</h1>
              <p className="text-sm text-muted-foreground">Entrez votre email et mot de passe</p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              En vous connectant, vous agréez aux{" "}
              <Link href="/cgu" className="underline underline-offset-4 hover:text-primary">
                Conditions d&apos;utilisation
              </Link>{" "}
              et à la{" "}
              <Link href="/politique-de-confidentialite" className="underline underline-offset-4 hover:text-primary">
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
