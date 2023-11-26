"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../../api/_queryClient";
import { useState } from "react";
import { type PropsWithChildren } from "react";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  // we assure queryClient is only created once
  const [uniqueQueryClientInstance] = useState(() => queryClient);
  return (
    <QueryClientProvider client={uniqueQueryClientInstance}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
