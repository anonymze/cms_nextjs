"use client";

import { ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import type { Table } from "./Table";
import { get } from "http";
import { SpinnerLoader } from "../Loader/Loader";
import { cn } from "@/utils/libs/tailwind/merge";

export type OrderBy = "asc" | "desc" | "reset";

export interface THead {
  columns: Table["columns"];
  hasActions: boolean;
  isLoading?: boolean;
}

export function TableHead({ columns, hasActions, isLoading }: THead) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const orderBy = getOrderBy(searchParams.get("orderBy"));

  return (
    <tr className="border-b">
      {columns.map((titleColumn, idx) => {
        return (
          <th
            align="left"
            className={cn(
              "px-4 py-3 text-muted-foreground cursor-pointer text-xs whitespace-nowrap first-letter:uppercase",
              // first column (generally the id column), we set a width 0 to fit the content
              idx === 0 && "w-0",
            )}
            key={idx}
            onClick={() =>
              router.push(
                `${pathname}?${getQueryParams(
                  searchParams.get("column"),
                  titleColumn,
                  orderBy,
                )}`,
              )
            }
          >
            {titleColumn} <ChevronsUpDown className="inline size-3" />
          </th>
        );
      })}

      {hasActions && (
        <th className="px-4 py-3 text-muted-foreground cursor-pointer text-xs whitespace-nowrap first-letter:uppercase">
          {isLoading && <SpinnerLoader />}
        </th>
      )}
    </tr>
  );
}

const getQueryParams = (column: string | null, titleColumn: string, orderBy: OrderBy) => {
  if (!column || column !== titleColumn) return `orderBy=asc&column=${titleColumn}`;

  return `orderBy=${orderBy}&column=${titleColumn}`;
};

const getOrderBy = (orderBy: string | null) => {
  if (!orderBy) return "asc";

  switch (orderBy) {
    case "asc":
      return "desc";
    case "desc":
      return "reset";
    default:
      return "asc";
  }
};
