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

function TableHead({ columns, hasActions, dispatch }: THead) {
  return (
    <>
      {columns.map((titleColumn) => {
        <td>{titleColumn}</td>;
      })}

      {hasActions && <td>actions</td>}
    </>
  );
}

export default TableHead;
