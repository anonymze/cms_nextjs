import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Table } from "./Table";

export type TValue = string | number | Date | boolean | null | undefined;

const MAX_LENGTH_VALUE = 24;

function TableBody({ data, hasActions }: { data: Table["data"]; hasActions: boolean }) {
  const dataKeys = useMemo(() => Object.keys(data[0] || {}), [data]);

  return (
    <>
      {data.map((field, idx) => (
        <tr className="border-b last:border-b-0" key={idx}>
          <>
            {dataKeys.map((key) => (
              <td align="left" className="px-4 py-3 text-sm whitespace-nowrap" key={key}>
                {trimmedString(field[key], key)}
              </td>
            ))}
          </>
          {hasActions && <td>actions</td>}
        </tr>
      ))}
    </>
  );
}

const trimmedString = (val: TValue, key: string) => {
  // == type coercion checks for null and undefined
  if (val == null) return;

  if (typeof val === "boolean") return val ? "Oui" : "Non";

  val = val.toString();

  // if value superior to the max length, we trim the string
  return val.length > MAX_LENGTH_VALUE ? val.substring(0, MAX_LENGTH_VALUE - 3) + "..." : val;
};

export default TableBody;
