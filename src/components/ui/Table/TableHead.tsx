"use client";

import { ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import type { Table } from "./Table";
import { get } from "http";

export type OrderBy = "asc" | "desc" | "reset";

export interface THead {
  columns: Table["columns"];
  hasActions: boolean;
}

export function TableHead({ columns, hasActions }: THead) {
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
            className="px-4 py-3 text-muted-foreground cursor-pointer text-xs whitespace-nowrap first-letter:uppercase"
            key={idx}
            onClick={() =>
              router.push(
                `${pathname}?${getQueryParams(
                  searchParams.get("column"),
                  titleColumn,
                  orderBy,
                )}` as __next_route_internal_types__.RouteImpl<string>,
              )
            }
          >
            {titleColumn} <ChevronsUpDown className="inline size-3" />
          </th>
        );
      })}

      {hasActions && <th></th>}
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
