"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Input";
import { Label } from "@/components/ui/Form/Label";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const VerificationCodeForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isLoaded: isClerkLoaded, signUp } = useSignUp();

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
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
      .then((res) => {
        setIsLoading(false);

        if (res.status === "complete") {
          toast.info(
            "Votre compte a été créé avec succès, une fois celui-ci validé par un administrateur vous pourrez vous connecter avec la même méthode de connexion",
            { duration: 6000 }
          );
          router.replace("/login");
        }
      })
      .catch((err) => {
        toast.error(err.errors[0].message);
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="code">
            Code de vérification
          </Label>
          <Input
            required
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
          Valider le code
        </Button>
        <Button type="button" onClick={() => router.back()} fill={false} disabled={isLoading}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default VerificationCodeForm;
