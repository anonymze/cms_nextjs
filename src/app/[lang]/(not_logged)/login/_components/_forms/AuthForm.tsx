"use client";

import { verifyUserQuery } from "@/api/queries/userQueries";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { SpinnerLoader } from "@/components/ui/loader/Loader";
import {
  isClerkAPIResponseError,
  useClerk,
  useSignIn,
  useSignUp,
} from "@clerk/nextjs";
import { GithubIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { LoginStateInfo } from "@/types/user";
import { LangContext } from "@/utils/providers";
import googleIcon from "@/assets/icons/oauths/google.svg";
import { i18n } from "@/i18n/translations";

export type AuthServices = {
  githubAuth?: {
    url: string;
  };
  googleAuth?: {
    url: string;
  };
};

const AuthForm = ({ githubAuth, googleAuth }: AuthServices) => {
  const { signOut } = useClerk();
  const lang = useContext(LangContext);
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
        // weird case here, if i call toast directly in the main thread, it doesn't work (maybe it is not loaded yet?)
        Promise.resolve().then(() =>
          toast.info(i18n[lang]("ACCOUNT_CREATED_NEED_VALIDATION"), {
            duration: 5000,
          })
        );
        break;
      case LoginStateInfo.INACTIVE:
        Promise.resolve().then(() =>
          toast.info(i18n[lang]("ACCOUNT_INACTIF_NEED_VALIDATION"))
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
      // we log out in case
      await signOut();

      await verifyUserQuery(email);

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
      console.log({ err });
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          toast.info(i18n[lang]("ACCOUNT_INACTIF_NEED_VALIDATION"));
          // if 404 from inside the route, we will create it in Clerk first
        } else if (
          err.response?.status === 404 &&
          typeof err.response.data?.message === "string"
        ) {
          await signUp
            .create({
              emailAddress: email,
              password: password,
            })
            .then(async (result) => {
              if (!result.emailAddress) {
                toast.error(i18n[lang]("SOMETHING_UNEXPECTED_HAPPENED"));
                return;
              }

              // send the user an email with the verification code
              await result.prepareEmailAddressVerification({
                strategy: "email_code",
              });

              router.push(`${pathname}?verifying=${result.emailAddress}}`);
            })
            .catch((err) => {
              setIsLoading(false);
              toast.error(err.errors[0].message);
            });
        } else {
          toast.error(err.message);
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
              {i18n[lang]("EMAIL")}
            </Label>
            <Input
              required
              name="email"
              id="email"
              placeholder={i18n[lang]("EMAIL")}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              {i18n[lang]("PASSWORD")}
            </Label>
            <Input
              required
              minLength={10}
              name="password"
              id="password"
              placeholder={i18n[lang]("PASSWORD")}
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <SpinnerLoader className="mr-2" />}
            {i18n[lang]("CONNECTION_WITH_EMAIL")}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {i18n[lang]("OR_CONNECTED_WITH")}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-2">
        {githubAuth?.url && (
          <button
            type="button"
            onClick={(ev) => {
              if (isLoading) return ev.preventDefault();
              setIsLoading(true);
              router.push(githubAuth.url);
            }}
            disabled={isLoading}
            className="flex items-center justify-center size-12 border-2 rounded-md hover:bg-muted"
            title={i18n[lang]("GITHUB_CONNECTION")}
          >
            {isLoading ? <SpinnerLoader /> : <GithubIcon className="size-5" />}
          </button>
        )}

        {googleAuth?.url && (
          <button
            type="button"
            onClick={(ev) => {
              if (isLoading) return ev.preventDefault();
              setIsLoading(true);
              router.push(googleAuth.url);
            }}
            disabled={isLoading}
            className="flex items-center justify-center size-12 border-2 rounded-md hover:bg-muted"
            title={i18n[lang]("GOOGLE_CONNECTION")}
          >
            {isLoading ? (
              <SpinnerLoader />
            ) : (
              <img src={googleIcon.src} alt="google" />
            )}
          </button>
        )}
      </div>
      <div
        className="px-8 text-center text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: i18n[lang](
            "CONNECTION_AGREEMENTS",
            lang,
            lang
          ),
        }}
      />
    </>
  );
};

export default AuthForm;
