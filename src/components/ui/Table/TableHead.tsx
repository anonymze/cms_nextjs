"use client";

import { ChevronsUpDown } from "lucide-react";
import type { Table } from "./Table";

export type OrderBy = "asc" | "desc" | "reset";

export interface THead {
  columns: Table["columns"];
  hasActions: boolean;
  dispatch: React.Dispatch<{
    type: OrderBy;
    payload?: Table["data"];
  }>;
}

export function TableHead({ columns, hasActions, dispatch }: THead) {
  return (
    <tr className="border-b">
      {columns.map((titleColumn, idx) => {
        return (
          <th
            align="left"
            className="px-4 py-3 text-muted-foreground cursor-pointer text-xs whitespace-nowrap first-letter:uppercase"
            key={idx}
          >
            {titleColumn} <ChevronsUpDown className="inline size-3" />
          </th>
        );
      })}

      {hasActions && (
        <th></th>
      )}
    </tr>
  );
}
