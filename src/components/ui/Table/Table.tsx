"use client";

import { memo } from "react";
import TableBody, { type TValue } from "./TableBody";
import { TableHead, type THead } from "./TableHead";
import { useSearchParams } from "next/navigation";
import { PaginationComponent } from "../pagination/PaginationComponent";
import type { TAction } from "./TableActions";

export interface ITable {
	// data should have an uuid for actions (delete, update, etc..)
	data: Array<{ uuid: string; [key: string]: TValue }>;
	columns: string[];
	actions?: TAction[];
	isLoading?: boolean;
}

export default function Table({ data, columns, actions, isLoading }: ITable) {
	const searchParams = useSearchParams();
	const dataOrdered = setOrderBy(data, searchParams.get("orderBy"), searchParams.get("column"));

	return (
		<>
			<div className="relative w-full overflow-auto border rounded-md">
				<table className="w-full">
					<thead>
						<TableHeadMemoized
							isLoading={isLoading}
							hasActions={actions?.length ? true : false}
							columns={columns}
						/>
					</thead>
					<tbody>
						<TableBody data={dataOrdered} actions={actions} />
					</tbody>
				</table>
			</div>
			<PaginationComponent />
		</>
	);
}

const setOrderBy = (data: ITable["data"], orderBy: string | null, titleColumn: string | null) => {
	if (!titleColumn || !orderBy || orderBy === "reset") return data;

	return data.sort((a, b) => {
		// @ts-expect-error
		if (a[titleColumn] < b[titleColumn]) return orderBy === "asc" ? -1 : 1;
		// @ts-expect-error
		if (a[titleColumn] > b[titleColumn]) return orderBy === "asc" ? 1 : -1;

		return 0;
	});
};

const TableHeadMemoized = memo(function THead({ hasActions, columns, isLoading }: THead) {
	return <TableHead isLoading={isLoading} hasActions={hasActions} columns={columns} />;
});
