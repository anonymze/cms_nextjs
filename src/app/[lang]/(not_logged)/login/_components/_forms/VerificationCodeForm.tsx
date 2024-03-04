"use client";

import { createUserQuery } from "@/api/queries/userQueries";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { SpinnerLoader } from "@/components/ui/loader/Loader";
import { i18n } from "@/i18n/translations";
import { LangContext } from "@/utils/providers";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function VerificationCodeForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const lang = useContext(LangContext);
  const { isLoaded: isClerkLoaded, signUp } = useSignUp();

  const verificationCode = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoading(true);

    if (!isClerkLoaded) {
      return;
    }

    const code = ev.currentTarget.code.value;

    // verify the code in email
    signUp
      .attemptVerification({
        strategy: "email_code",
        code: code || "",
      })
      .then(async (result) => {
        if (result.status !== "complete") {
        }

        await createUserQuery({
          clerkUserId: result.createdUserId || "",
        });

        router.push(`/${lang}/login?info=created`);
      })
      .catch((err) => {
        if (isClerkAPIResponseError(err)) {
          toast.error(err.errors?.[0]?.message);
        } else if (err instanceof Error) {
          toast.error(err.message);
        }

        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={verificationCode} autoComplete="off">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="code">
            {i18n[lang]("CODE_VERIFICATION")}
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
          {isLoading && <SpinnerLoader className="mr-2" />}
          {i18n[lang]("VALIDATE_CODE")}
        </Button>
        <Button
          type="button"
          onClick={() => router.back()}
          fill={false}
          disabled={isLoading}
        >
          {i18n[lang]("CANCEL")}
        </Button>
      </div>
    </form>
  );
}
