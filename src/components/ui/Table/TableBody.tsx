import { useMemo } from "react";
import { TableActions } from "./TableActions";
import type { Table } from "./Table";
import { useMutation } from "@tanstack/react-query";
import { deleteUserQuery, updateUserQuery } from "@/api/queries/userQueries";

const MAX_LENGTH_VALUE = 24;

export type TValue = string | number | Date | boolean | null | undefined;

function TableBody({ data, hasActions }: { data: Table["data"]; hasActions: boolean }) {
  const deleteMutation = useMutation({
    mutationFn: deleteUserQuery,
    mutationKey: ["users"],
    meta: {
      action: "delete",
      message: "Utilisateur supprimé",
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUserQuery,
    mutationKey: ["users"],
    meta: {
      action: "update",
      message: "Utilisateur mis à jour",
    },
  });

  const dataKeys = useMemo(() => Object.keys(data[0] || {}), [data]);

  return (
    <>
      {data.map((field, idx) => (
        <tr className="border-b last:border-b-0" key={idx}>
          <>
            {dataKeys.map((key) => (
              <td align="left" className="px-4 py-3 text-sm whitespace-nowrap" key={key}>
                {trimmedString(field[key])}
              </td>
            ))}
          </>
          {hasActions && (
            <td className="px-4 py-3 text-sm whitespace-nowrap">
              <TableActions
                actions={[
                  {
                    label: "Activer",
                    action: () => {
                      updateMutation.mutate({ uuid: field.uuid, isActive: true });
                    },
                    disabled: !!field.isActive,
                  },
                  {
                    label: "Supprimer",
                    action: () => {
                      deleteMutation.mutate(field.uuid);
                    },
                  },
                ]}
              />
            </td>
          )}
        </tr>
      ))}
    </>
  );
}

const trimmedString = (val: TValue) => {
  // == type coercion checks for null and undefined
  if (val == null) return;

  if (typeof val === "boolean") return val ? "Oui" : "Non";

  val = val.toString();

  // if value superior to the max length, we trim the string
  return val.length > MAX_LENGTH_VALUE ? val.substring(0, MAX_LENGTH_VALUE - 3) + "..." : val;
};

export default TableBody;
