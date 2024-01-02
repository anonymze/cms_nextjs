"use client";

import { memo, useEffect, useReducer } from "react";
import TableBody, { type TValue } from "./TableBody";
import { TableHead, type OrderBy, type THead } from "./TableHead";

export interface Table {
  data: { [key: string]: TValue }[];
  columns: string[];
  hasActions: boolean;
}

function Table({ data, columns, hasActions }: Table) {
  const [state, dispatch] = useReducer(reducer, data);

  useEffect(() => {
    dispatch({ payload: data });
  }, [data]);

  return (
    <div className="relative w-full overflow-auto border rounded-md">
      <table className="w-full">
        <thead>
          <TableHeadMemoized dispatch={dispatch} hasActions={hasActions} columns={columns} />
        </thead>
        <tbody>
          <TableBody hasActions={hasActions} data={state} />
        </tbody>
      </table>
    </div>
  );
}

const TableHeadMemoized = memo(function THead({ hasActions, columns, dispatch }: THead) {
  return <TableHead dispatch={dispatch} hasActions={hasActions} columns={columns} />;
});

const reducer = (state: Table["data"], action: { type?: OrderBy; payload?: Table["data"] }) => {
  switch (action.type) {
    case "asc":
      return state;
    case "desc":
      return state;
    case "reset":
      return state;
    default:
      return action.payload ?? state;
  }
};

export default Table;