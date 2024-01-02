"use client";

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
        return (<th align="left" className="px-2 py-2 text-muted-foreground text-xs" key={idx}>{titleColumn}</th>);
      })}

      {hasActions && <th>actions</th>}
    </tr>
  );
}
