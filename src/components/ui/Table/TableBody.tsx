import { useMemo } from "react";
import { TableActions, type TAction } from "./TableActions";
import type { Table } from "./Table";

export type TValue = string | number | Date | boolean | null | undefined;

function TableBody({ data, actions }: { data: Table["data"]; actions?: TAction[] }) {
  const dataKeys = useMemo(() => Object.keys(data[0] || {}), [data]);

  return (
    <>
      {data.map((field, idx) => (
        <tr className="border-b last:border-b-0" key={idx}>
          {dataKeys.map((key) => (
            <td align="left" className="px-4 py-3 text-sm" key={key}>
              <p title={trimmedVal(field[key])} className="max-w-24 truncate lg:max-w-36">{trimmedVal(field[key])}</p>
            </td>
          ))}
          {actions?.length ? (
            <td className="px-4 py-3 text-sm whitespace-nowrap">
              <TableActions entity={field} actions={actions} />
            </td>
          ) : null}
        </tr>
      ))}
    </>
  );
}

const trimmedVal = (val: TValue) => {
  // == type coercion checks for null and undefined
  if (val == null) return;
  if (typeof val === "boolean") return val ? "Oui" : "Non";
  return val.toString().trim();
};

export default TableBody;
