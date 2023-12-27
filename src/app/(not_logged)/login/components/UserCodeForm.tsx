import { Input } from "@/components/Form/Input";
import { Label } from "@/components/Form/Label";
import { Button } from "@/components/ui/Button";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {}

const UserCodeForm: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded: isClerkLoaded, signUp, setActive } = useSignUp();

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

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Authentification</h1>
          <p className="text-sm text-muted-foreground">Entrez le code de vérification reçu</p>
        </div>
        <form onSubmit={onSubmit} autoComplete="off">
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
              Valider le code
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCodeForm;
