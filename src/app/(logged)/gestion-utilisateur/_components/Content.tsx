"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../components/ui/table/Table";
import { deleteUserQuery, getUsersQuery, updateUserQuery } from "@/api/queries/userQueries";
import { getKeysTypedObject } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import type { User } from "@prisma/client";

export default function Content() {
	const searchParams = useSearchParams();

	const {
		data: users,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["users", { page: searchParams.get("page") }],
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

	if (isLoading) {
		return <div>Chargement...</div>;
	}

	if (isError) {
		return <div>Erreur...</div>;
	}

	if (!users || !users[0]) {
		return <div>Aucune donnée...</div>;
	}

	return (
		<Table
			isLoading={deleteMutation.isPending || updateMutation.isPending}
			actions={[
				{
					label: "Activer",
					showMarkerOnDisabled: true,
					action: (entity: User) => {
						updateMutation.mutate({ uuid: entity.uuid, isActive: true });
					},
					disabled: (entity: User) => {
						return entity.isActive;
					},
				},
				{
					label: "Supprimer",
					action: (entity: User) => {
						deleteMutation.mutate(entity.uuid);
					},
				},
				{
					label: "Rôle",
					showMarkerOnDisabled: true,
					subMenu: {
						items: [
							{
								label: "Administrateur",
								action: () => {
									console.log("Administrateur");
								},
							},
							{
								label: "Utilisateur",
								action: () => {
									console.log("Utilisateur");
								},
							},
							{
								label: "Invité",
								action: () => {
									console.log("Invité");
								},
							},
						],
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
