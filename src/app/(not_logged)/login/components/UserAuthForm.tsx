"use client";
import { Input } from "@/components/Form/Input";
import { Label } from "@/components/Form/Label";
import { Button } from "@/components/ui/Button";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { cn } from "@/utils/libs/shadcn";
import { useSignUp } from "@clerk/nextjs";
import { GithubIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ENV_CLIENT } from "@/env/client";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoaded: isClerkLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(ENV_CLIENT.NEXT_PUBLIC_GITHUB_ASK_AUTHORIZATION_URL);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoading(true);

    if (!isClerkLoaded) {
      console.error("Clerk is not loaded yet");
      return;
    }

    await signUp
      .create({
        emailAddress: ev.currentTarget.email.value,
        password: ev.currentTarget.email.value,
      })
      .then(async (result) => {
        // send the user an email with the verification code
        await result.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        const params = new URLSearchParams(searchParams);
        params.set("verifying", result.emailAddress || "");
        router.push((pathname + "?" + params.toString()) as __next_route_internal_types__.RouteImpl<string>);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Authentification</h1>
          <p className="text-sm text-muted-foreground">Entrez votre email et mot de passe</p>
        </div>
        <div className={cn("grid gap-6", className)} {...props}>
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  name="email"
                  id="email"
                  placeholder="nom@exemple.fr"
                  type="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Mot de passe
                </Label>
                <Input
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
          {ENV_CLIENT.NEXT_PUBLIC_GITHUB_CLIENT_ID && ENV_CLIENT.NEXT_PUBLIC_GITHUB_ASK_AUTHORIZATION_URL && (
            <Button outline type="button" disabled={isLoading}>
              <a href={ENV_CLIENT.NEXT_PUBLIC_GITHUB_ASK_AUTHORIZATION_URL} title="Github connexion">
                {isLoading ? <SpinnerLoader /> : <GithubIcon />} Github
              </a>
            </Button>
          )}
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
        </div>
      </div>
    </div>
  );
}
