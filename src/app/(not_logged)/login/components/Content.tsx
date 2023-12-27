"use client";

import { Activity } from "lucide-react";
import { UserAuthForm } from "./UserAuthForm";
import { useSearchParams } from "next/navigation";
import UserCodeForm from "./UserCodeForm";

const Content: React.FC = () => {
  const searchParams = useSearchParams();
  return (
    <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
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
      {searchParams.get("verifying") ? <UserCodeForm /> : <UserAuthForm />}
    </div>
  );
};

export default Content;
