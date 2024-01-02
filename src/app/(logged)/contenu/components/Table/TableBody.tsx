import { useMemo } from "react";
import type { Table } from "./Table";

export type TValue = string | number | Date | boolean;

const MAX_LENGTH_VALUE = 16;

function TableBody({ data, hasActions }: { data: Table["data"]; hasActions: boolean }) {
  const dataKeys = useMemo(() => Object.keys(data[0] || {}), [data]);

  return (
    <>
      {data.map((field, idx) => (
        <tr className="border-b last:border-b-0" key={idx}>
          <>
            {dataKeys.map((key) => (
              <td className="px-2 py-2 whitespace-nowrap" key={key}>{trimmedString(field[key] || "")}</td>
            ))}
          </>
          {hasActions && <td>actions</td>}
        </tr>
      ))}
    </>
  );
}

const trimmedString = (val: TValue) => {
    if (typeof val === "boolean") return val;
  
    val = val.toString();

    // if value superior to the max length, we trim the string
    return val.length > MAX_LENGTH_VALUE ? val.substring(0, MAX_LENGTH_VALUE - 3) + "..." : val;
  };

export default TableBody;
