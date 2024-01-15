"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../components/Table/Table";
import { deleteUserQuery, getUsersQuery, updateUserQuery } from "@/api/queries/userQueries";
import type { User } from "@prisma/client";

export default function Content() {
  const { data: Users } = useQuery({
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

  if (!Users) {
    return <div>Chargement...</div>;
  }

  if (Users.length === 0) {
    return <div>Aucune donnée...</div>;
  }

  return (
    <Table
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
      data={Users}
      columns={Object.keys(Users[0] as User)}
    />
  );
}
