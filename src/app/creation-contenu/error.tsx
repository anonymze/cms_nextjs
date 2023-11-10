"use client"; // Error components must be Client Components

import { ToastAction } from "@/components/ui/Toaster/Toast";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "Une erreur non contrôlée est survenue",
      description: error.message,
      variant: "destructive",
      action: (
        <ToastAction onClick={() => reset()} altText="Rééesayer">
          Rééssayer
        </ToastAction>
      ),
      // duration: 9000,
    });
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return null;
}
