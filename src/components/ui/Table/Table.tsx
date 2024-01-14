"use client";

import { memo } from "react";
import TableBody, { type TValue } from "./TableBody";
import { TableHead, type THead } from "./TableHead";
import { useSearchParams } from "next/navigation";

export interface Table {
  // data should have an uuid for actions (delete, update, etc..)
  data: { [key: string]: TValue, uuid: string }[];
  columns: string[];
  hasActions: boolean;
}

export default function Table({ data, columns, hasActions }: Table) {
  const searchParams = useSearchParams();
  const dataOrdered = setOrderBy(data, searchParams.get("orderBy"), searchParams.get("column"));

  return (
    <div className="relative w-full overflow-auto border rounded-md">
      <table className="w-full">
        <thead>
          <TableHeadMemoized hasActions={hasActions} columns={columns} />
        </thead>
        <tbody>
          <TableBody hasActions={hasActions} data={dataOrdered} />
        </tbody>
      </table>
    </div>
  );
}

const setOrderBy = (data: any[], orderBy: string | null, titleColumn: string | null) => {
  if (!titleColumn || !orderBy || orderBy === "reset") return data;

  return data.sort((a, b) => {
    if (a[titleColumn] < b[titleColumn]) return orderBy === "asc" ? -1 : 1;
    if (a[titleColumn] > b[titleColumn]) return orderBy === "asc" ? 1 : -1;

    return 0;
  });
};

const TableHeadMemoized = memo(function THead({ hasActions, columns }: THead) {
  return <TableHead hasActions={hasActions} columns={columns} />;
});
