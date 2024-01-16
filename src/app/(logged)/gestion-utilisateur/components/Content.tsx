"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../components/Table/Table";
import { deleteUserQuery, getUsersQuery, updateUserQuery } from "@/api/queries/userQueries";
import { getKeysTypedObject } from "@/utils/helper";

export default function Content() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersQuery,
  });

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

  if (!users) {
    return <div>Chargement...</div>;
  }

  if (!users.length) {
    return <div>Aucune donnée...</div>;
  }

  return (
    <Table
      isLoading={deleteMutation.isPending || updateMutation.isPending}
      actions={[
        {
          label: "Activer",
          action: (uuid) => {
            updateMutation.mutate({ uuid, isActive: true });
          },
          disabled: (entity) => {
            return entity?.["isActive"];
          },
        },
        {
          label: "Supprimer",
          action: (uuid: string) => {
            deleteMutation.mutate(uuid);
          },
        },
      ]}
      data={users}
      // for now the type with keys is not really useful, but keep it ! We will upgrade the Table component when i'm better with typescript
      columns={getKeysTypedObject(users[0]!)}
    />
  );
}
