"use client";

import { verifyUserQuery } from "@/api/queries/userQueries";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Input";
import { Label } from "@/components/ui/Form/Label";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { ENV_CLIENT } from "@/env/client";
import { isClerkAPIResponseError, useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { LoginStateInfo } from "@/types/user";

const AuthForm = () => {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoaded: isClerkSignUpLoaded, signUp } = useSignUp();
  const { isLoaded: isClerkSignInLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    const info = searchParams.get("info");

    // if we get an info we are aware of, we can display a toast
    switch (info) {
      case LoginStateInfo.CREATED:
        // weird case here i don't understand, if i call toast.xxx directly in the main thread, it doesn't work (maybe he is not loaded yet?)
        Promise.resolve().then(() =>
          toast.info(
            "Votre compte a été créé avec succès, une fois celui-ci validé par un administrateur vous pourrez vous connecter avec la même méthode de connexion",
            { duration: 5000 },
          ),
        );
        break;
      case LoginStateInfo.INACTIVE:
        Promise.resolve().then(() =>
          toast.info("Votre compte est inactif, veuillez contacter un administrateur pour l'activer"),
        );
        break;
    }
  }, []);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!isClerkSignUpLoaded || !isClerkSignInLoaded) {
      return;
    }

    setIsLoading(true);

    const email = ev.currentTarget.email.value;
    const password = ev.currentTarget.password.value;

    // during the whole process, if something is wrong we land in the catch section
    try {
      await verifyUserQuery(email);

      // we log out in case
      await signOut();

      // at this point, the user exists in our database
      // and we can try to sign in with Clerk's session
      const signInResource = await signIn.create({
        strategy: "password",
        identifier: email,
        password,
      });

      await setActive({
        session: signInResource.createdSessionId,
      });

      router.replace("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          toast.info("Votre compte est inactif, veuillez contacter un administrateur pour l'activer");
          // if 404 from inside the route, we will create it in Clerk first
        } else if (err.response?.status === 404 && typeof err.response.data?.message === "string") {
          await signUp
            .create({
              emailAddress: email,
              password: password,
            })
            .then(async (result) => {
              if (!result.emailAddress) {
                toast.error(
                  "Quelque chose d'innatendu s'est produit, Clerk n'a pas retourné d'adresse email. Veuillez réessayer",
                );
                return;
              }

              // send the user an email with the verification code
              await result.prepareEmailAddressVerification({
                strategy: "email_code",
              });

              router.push(
                `${pathname}?verifying=${result.emailAddress}}` as __next_route_internal_types__.RouteImpl<string>,
              );
            })
            .catch((err) => {
              setIsLoading(false);
              toast.error(err.errors[0].message);
            });
        }
      } else if (isClerkAPIResponseError(err)) {
        toast.error(err.errors?.[0]?.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }

      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
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
            {isLoading && <SpinnerLoader className="mr-2" />}
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
      </p>
    </>
  );
};

export default AuthForm;
