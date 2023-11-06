"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/_queryClient";
import type { PropsWithChildren } from "react";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
