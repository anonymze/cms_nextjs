// we use this page if we need to log the user in the front (like creating a clerk's session)
"use client";

import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Content() {
  const { signIn, setActive } = useSignIn();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!signIn || !setActive) {
      return;
    }

    const token = params.get("token");
    const info = params.get("info");

    if (info && !token) {
      switch (info) {
        case "created":
          toast.info(
            "Votre compte a été créé avec succès, une fois celui-ci validé par un administrateur vous pourrez vous connecter avec la même méthode de connexion",
            { duration: 6000 },
          );
          return router.replace("/login");
        case "inactive":
          toast.info("Votre compte est inactif, veuillez contacter un administrateur pour l'activer");
          return router.replace("/login");
      }
    }

    if (!token) {
      toast.error("Une erreur inconnue est survenue");
      return router.replace("/login");
    }

    const aFunc = async () => {
      try {
        // create a signIn with the token, note that you need to use the "ticket" strategy
        const res = await signIn.create({
          strategy: "ticket",
          ticket: token,
        });

        await setActive({
          session: res.createdSessionId,
        });

        return router.replace("/dashboard" as __next_route_internal_types__.RouteImpl<string>);
      } catch (err) {
        toast.error("Une erreur inconnue est survenue");
        return router.replace("/login");
      }
    };

    aFunc();
  }, [signIn, setActive, router, params]);

  return (
    <div className="grid place-items-center h-full">
      <SpinnerLoader large />
    </div>
  );
}
