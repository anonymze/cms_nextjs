"use client";

import { Input } from "@/components/Form/Input";
import { Label } from "@/components/Form/Label";
import { Button } from "@/components/ui/Button";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { cn } from "@/utils/libs/shadcn";
import { useSignUp } from "@clerk/nextjs";
import { GithubIcon } from "lucide-react";
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { isLoaded: isClerkLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!isClerkLoaded) {
      console.error('Clerk is not loaded yet');
      return;
    }

    await signUp
      .create({
        emailAddress: "t@gmail.com",
        password: "oki",
      })
      .then(async (result) => {
        // Send the user an email with the verification code
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        // Set 'verifying' true to display second form and capture the OTP code
        // setVerifying(true);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
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
