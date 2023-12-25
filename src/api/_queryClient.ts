import "@tanstack/react-query";
import type { AxiosError } from "axios";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

// we use axios so we declare the type error returned
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000, // 1 second
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});
