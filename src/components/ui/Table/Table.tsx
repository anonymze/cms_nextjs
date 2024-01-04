"use client";

import { memo } from "react";
import TableBody, { type TValue } from "./TableBody";
import { TableHead, type THead } from "./TableHead";

export interface Table {
  data: { [key: string]: TValue }[];
  columns: string[];
  hasActions: boolean;
}

function Table({ data, columns, hasActions }: Table) {
  return (
    <div className="relative w-full overflow-auto border rounded-md">
      <table className="w-full">
        <thead>
          <TableHeadMemoized hasActions={hasActions} columns={columns} />
        </thead>
        <tbody>
          <TableBody hasActions={hasActions} data={data} />
        </tbody>
      </table>
    </div>
  );
}

const TableHeadMemoized = memo(function THead({ hasActions, columns }: THead) {
  return <TableHead hasActions={hasActions} columns={columns} />;
});

export default Table;
