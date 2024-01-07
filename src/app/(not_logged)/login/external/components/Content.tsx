// we use this page if we need to log the user in the front (like creating a clerk's session)
"use client";

import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Content() {
  const { signIn, setActive } = useSignIn();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!signIn || !setActive) return;

    const token = params.get("token");

    // we have to use a async function here because we can't use async/await in useEffect
    const asyncCall = async () => {
      try {
        // create a signIn with the token from the magic link in server side, note that you need to use the "ticket" strategy
        const res = await signIn.create({
          strategy: "ticket",
          ticket: token || "",
        });

        await setActive({
          session: res.createdSessionId,
        });

        return router.replace("/dashboard" as __next_route_internal_types__.RouteImpl<string>);
      } catch (err) {
        if (isClerkAPIResponseError(err)) {
          if (err.errors?.[0]?.code === "session_exists") {
            return router.replace("/dashboard");
          }

          toast.error(err.errors?.[0]?.message);
        }

        return router.replace("/login");
      }
    };

    asyncCall();
  }, [signIn, router, params, setActive]);

  return (
    <div className="grid place-items-center h-full">
      <SpinnerLoader large />
    </div>
  );
}
