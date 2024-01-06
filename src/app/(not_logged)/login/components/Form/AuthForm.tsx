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

    let shouldCreateUserWithClerk = true;
    const email = ev.currentTarget.email.value;
    const password = ev.currentTarget.password.value;

    await verifyUserQuery(email)
      .then(async () => {
        shouldCreateUserWithClerk = false;

        // if user found and active, we can sign in and log
        await signIn
          .create({
            strategy: "password",
            identifier: email,
            password,
          })
          .then(async (res) => {
            setIsLoading(false);
            if (res.status === "complete") {
              await setActive({
                session: res.createdSessionId,
              });

              router.replace("/dashboard");
            }
          })
          .catch((err) => {
            setIsLoading(false);
            return toast.error(err.errors[0].message);
          });
      })
      .catch((err: AxiosError) => {
        // if 403, it's because the user is not active
        if (err.response?.status === 403) {
          shouldCreateUserWithClerk = false;
          setIsLoading(false);
          return toast.error("Votre compte est inactif, un administrateur doit le valider");
        }

        // the others status means (in theory) that we should create the user with clerk
        return;
      });

    if (!shouldCreateUserWithClerk) return;

    await signUp
      .create({
        emailAddress: email,
        password,
      })
      .then(async (result) => {
        setIsLoading(false);

        if (!result.emailAddress) {
          toast.error("Quelque chose d'innatendu s'est produit. Veuillez réessayer");
          return;
        }

        // send the user an email with the verification code
        await result.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        const params = new URLSearchParams(searchParams);
        params.set("verifying", result.emailAddress);

        router.push(`${pathname}?${params.toString()}` as __next_route_internal_types__.RouteImpl<string>);
      })
      .catch((err) => {
        setIsLoading(false);

        if (err.errors[0].code === "form_param_format_invalid") {
          return toast.error("L'email doit être au bon format");
        }

        return toast.error(err.errors[0].message);
      });
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
