"use client";

import { Trash2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { SpinnerLoader } from "../ui/loader/Loader";
import { cn } from "@/utils/libs/tailwind/merge";
import { deleteMediaQuery } from "@/api/queries/mediaQueries";
import type { HTMLAttributes } from "react";
import type { Media } from "@prisma/client";
import "./MediaOperation.css";

interface Props extends HTMLAttributes<HTMLElement> {
	removeFileFromApi: Media["uuid"] | false;
}

export default function MediaOperation({ removeFileFromApi, children, ...props }: Props) {
	const deleteMutation = useMutation({
		mutationFn: deleteMediaQuery,
		mutationKey: ["media"],
		meta: {
			message: "Le média a été supprimé",
		},
	});

	return (
		<figure
			onClick={async () => {
				if (!removeFileFromApi) return;
				deleteMutation.mutate(removeFileFromApi);
			}}
			className="media-operation"
			{...props}
		>
			{children}
			<figcaption className={cn(deleteMutation.isPending && "action")}>
				{deleteMutation.isSuccess || deleteMutation.isPending ? (
					<SpinnerLoader className="w-8 h-8" />
				) : (
					<Trash2Icon className="w-8 h-8" />
				)}
			</figcaption>
		</figure>
	);
}
