// set all your providers here
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../api/_queryClient";
import { createContext, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { I18n } from "@/types/i18n";
import { type PropsWithChildren } from "react";

export const LangContext = createContext<I18n>(I18n.DEFAULT);

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
        <LangContext.Provider value={lang}>{children}</LangContext.Provider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};
