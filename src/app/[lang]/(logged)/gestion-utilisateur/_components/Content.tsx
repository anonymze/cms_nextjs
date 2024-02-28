"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../../components/ui/table/Table";
import {
  deleteUserQuery,
  getUsersQuery,
  updateUserQuery,
} from "@/api/queries/userQueries";
import { getKeysTypedObject } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { UserRole } from "@/types/user";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import type { User } from "@prisma/client";

export default function Content() {
  const lang = useContext(LangContext);
  const searchParams = useSearchParams();

  const {
    data: users,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["users", { page: searchParams.get("page") }],
    queryFn: getUsersQuery,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserQuery,
    mutationKey: ["users"],
    meta: {
      action: "delete",
      message: i18n[lang]("USER_DELETED"),
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUserQuery,
    mutationKey: ["users"],
    meta: {
      action: "update",
      message: i18n[lang]("USER_EDITED"),
    },
  });

  if (isLoading || isFetching) {
    return <div>{i18n[lang]("LOADING")}...</div>;
  }

  if (!users || !users[0]) {
    return <div>{i18n[lang]("NO_DATA")}...</div>;
  }

  return (
    <Table
      isLoading={deleteMutation.isPending || updateMutation.isPending}
      actions={[
        {
          label: i18n[lang]("ENABLE"),
          showMarkerOnDisabled: true,
          action: (entity: User) => {
            updateMutation.mutate({ uuid: entity.uuid, isActive: true });
          },
          disabled: (entity: User) => {
            return entity.isActive;
          },
        },
        {
          label: i18n[lang]("ROLE"),
          showMarkerOnDisabled: true,
          subMenu: {
            items: [
              {
                label: i18n[lang]("ADMINISTRATOR"),
                action: (entity: User) => {
                  console.log(entity);
                  updateMutation.mutate({ uuid: entity.uuid, role: UserRole.ADMIN });
                },
                disabled: (entity: User) => {
                  return entity.role === UserRole.ADMIN;
                },
              },
              {
                label: i18n[lang]("USER"),
                action: (entity: User) => {
                  updateMutation.mutate({ uuid: entity.uuid, role: UserRole.USER });
                },
                disabled: (entity: User) => {
                  return entity.role === UserRole.USER;
                },
              },
              {
                label: i18n[lang]("GUEST"),
                action: (entity: User) => {
                  updateMutation.mutate({ uuid: entity.uuid, role: UserRole.GUEST });
                },
                disabled: (entity: User) => {
                  return entity.role === UserRole.GUEST;
                },
              },
            ],
          },
        },
        {
          label: i18n[lang]("DELETE"),
          action: (entity: User) => {
            deleteMutation.mutate(entity.uuid);
          },
        },
      ]}
      data={users}
      // for now the type with keys is not really useful,
      // but keep it ! We will upgrade the Table component when i'm better with Typescript
      columns={getKeysTypedObject(users[0])}
    />
  );
}
