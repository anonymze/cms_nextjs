// we use this page if we need to log the user in the front (like creating a clerk's session)
"use client";

import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Content() {
  const { signIn, setActive } = useSignIn();
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!signIn || !setActive || !token) {
      return router.replace("/login");
    }

    const aFunc = async () => {
      console.log("iciii");
      try {
        // create a signIn with the token, note that you need to use the "ticket" strategy
        const res = await signIn.create({
          strategy: "ticket",
          ticket: token,
        });

        setActive({
          session: res.createdSessionId,
        });

        return router.replace("/dashboard" as __next_route_internal_types__.RouteImpl<string>);
      } catch (err) {
        return router.replace("/login");
      }
    };

    aFunc();
  }, [signIn, setActive, token, router]);

  return (
    <div className="grid place-items-center h-full">
      <SpinnerLoader large />
    </div>
  );
}
