// set all your providers here
"use client";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../api/_queryClient";
import { useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { type PropsWithChildren } from "react";
import { type I18n } from "@/types/i18n";

export const Providers: React.FC<PropsWithChildren & { lang: I18n }> = ({
  children,
  lang,
}) => {
  // we assure queryClient is only created once
  const [uniqueQueryClientInstance] = useState(() => queryClient);

  return (
    <ClerkProvider>
      <QueryClientProvider client={uniqueQueryClientInstance}>
        <ReactQueryDevtools initialIsOpen={false} />
        <LangProvider queryClient={uniqueQueryClientInstance} lang={lang}>
          {children}
        </LangProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

// set the data from the server then hydrate it on children 
const LangProvider = ({
  children,
  queryClient,
  lang,
}: PropsWithChildren & { lang: I18n; queryClient: QueryClient }) => {
  queryClient.setQueryData(["lang"], lang);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
