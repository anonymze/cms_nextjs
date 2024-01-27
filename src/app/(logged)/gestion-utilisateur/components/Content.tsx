"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../../components/ui/Table/Table";
import { deleteUserQuery, getUsersQuery, updateUserQuery } from "@/api/queries/userQueries";
import { getKeysTypedObject } from "@/utils/helper";
import { useSearchParams } from "next/navigation";

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
					action: (uuid) => {
						updateMutation.mutate({ uuid, isActive: true });
					},
					disabled: (entity) => {
						return entity?.isActive;
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
			// for now the type with keys is not really useful,
			// but keep it ! We will upgrade the Table component when i'm better with Typescript
			columns={getKeysTypedObject(users[0])}
		/>
	);
}
