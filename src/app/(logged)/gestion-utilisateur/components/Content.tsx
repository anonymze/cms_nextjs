"use client";
import { useQuery } from "@tanstack/react-query";
import Table from "../../../../components/ui/Table/Table";
import { getUsersQuery } from "@/api/queries/userQueries";
import type { User } from "@prisma/client";

export default function Content() {
  const { data: Users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersQuery,
  });

  if (!Users) {
    return <div>Chargement...</div>;
  }

  if (Users.length === 0) {
    return <div>Aucune donnée...</div>;
  }

  return <Table hasActions data={Users} columns={Object.keys(Users[0] as User)} />;
};
