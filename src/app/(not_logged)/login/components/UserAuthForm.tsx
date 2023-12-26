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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoaded: isClerkLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onSubmitCode = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoading(true);

    if (!isClerkLoaded) {
      console.error("Clerk is not loaded yet");
      return;
    }

    // verify the code in email
    signUp
      .attemptVerification({
        strategy: "email_code",
        code: ev.currentTarget.code.value,
      })
      .then((result) => {
        setIsLoading(false);

        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          router.push(
            (searchParams.get("redirect_url") ||
              "/dashboard") as __next_route_internal_types__.RouteImpl<string>,
          );
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  if (searchParams.get("verifying")) {
    return (
      <form onSubmit={onSubmitCode} autoComplete="off">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="code">
              Code de vérification
            </Label>
            <Input
              name="code"
              id="code"
              placeholder="123456"
              type="text"
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
    );
  }

  return (
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
      <Button outline type="button" disabled={isLoading}>
        {isLoading ? <SpinnerLoader /> : <GithubIcon />} Github
      </Button>
    </div>
  );
}