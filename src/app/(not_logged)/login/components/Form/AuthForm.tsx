"use client";

import { verifyUserQuery } from "@/api/queries/userQueries";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Input";
import { Label } from "@/components/ui/Form/Label";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { ENV_CLIENT } from "@/env/client";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { AxiosError } from "axios";

const AuthForm = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoaded: isClerkSignUpLoaded, signUp } = useSignUp();
  const { isLoaded: isClerkSignInLoaded, signIn, setActive } = useSignIn();

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoading(true);

    if (!isClerkSignUpLoaded || !isClerkSignInLoaded) {
      return;
    }

    const email = ev.currentTarget.email.value;
    const password = ev.currentTarget.password.value;

    
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              required
              name="email"
              id="email"
              placeholder="nom@exemple.fr"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Mot de passe
            </Label>
            <Input
              required
              minLength={10}
              name="password"
              id="password"
              placeholder="mot de passe"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <SpinnerLoader />}
            Connexion avec email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">ou connectez-vous avec</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-2">
        {ENV_CLIENT.NEXT_PUBLIC_GITHUB_CLIENT_ID && ENV_CLIENT.NEXT_PUBLIC_GITHUB_ASK_AUTHORIZATION_URL && (
          <a
            onClick={(ev) => {
              if (isLoading) return ev.preventDefault();
              setIsLoading(true);
            }}
            aria-disabled={isLoading}
            className="flex items-center justify-center size-12 border-2 rounded-md hover:bg-primary/10"
            href={ENV_CLIENT.NEXT_PUBLIC_GITHUB_ASK_AUTHORIZATION_URL}
            title="Github connexion"
          >
            {isLoading ? <SpinnerLoader className="mr-0" /> : <GithubIcon className="size-5" />}
          </a>
        )}
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        En vous connectant, vous agréez aux{" "}
        <Link href="/cgu" className="underline underline-offset-4 hover:text-primary">
          Conditions d&apos;utilisation
        </Link>{" "}
        et à la{" "}
        <Link
          href="/politique-de-confidentialite"
          className="underline underline-offset-4 hover:text-primary"
        >
          Politique de confidentialité
        </Link>
        .
      </p>
    </>
  );
};

export default AuthForm;
