"use client";

import { CheckIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { SpinnerLoader } from "../ui/loader/Loader";
import { cn } from "@/utils/libs/tailwind/helper";
import { deleteMediaQuery } from "@/api/queries/mediaQueries";
import type { HTMLAttributes } from "react";
import { useFilesStore } from "@/contexts/store_files_context";
import type { Media } from "@prisma/client";
import "./MediaOperation.css";

type Props = HTMLAttributes<HTMLElement> & {
	mediaUuid: string
} &
	(
		| { removeMediaFromApi: Media["uuid"] | false; selectMedia?: never; editionMedia?: never }
		| { removeMediaFromApi?: never; selectMedia: boolean; editionMedia?: never }
		| { removeMediaFromApi?: never; selectMedia?: never; editionMedia: boolean }
	);

export default function MediaOperation({
	mediaUuid,
	removeMediaFromApi,
	selectMedia,
	editionMedia,
	children,
	className,
	...props
}: Props) {
	const setFiles = useFilesStore((state) => state.setFiles);
	const files = useFilesStore((state) => state.files);
	const isSelected = files.some((file) => file.id === mediaUuid);

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
				if (removeMediaFromApi) deleteMutation.mutate(removeMediaFromApi);
				if (selectMedia) {
					// we set fake data because we only need the id to manipulate the media
					setFiles([{ id: mediaUuid, base64: "", file: new File([""], "") }]);
				}

				if (editionMedia) {
				}
			}}
			className={cn("media-operation", className)}
			{...props}
		>
			{children}
			{selectMedia ? (
				<figcaption className={cn(isSelected && "action")}>
					{isSelected ? <CheckIcon className="w-8 h-8" /> : <PlusIcon className="w-8 h-8" />}
				</figcaption>
			) : (
				<figcaption className={cn(deleteMutation.isPending && "action")}>
					{deleteMutation.isSuccess || deleteMutation.isPending ? (
						<SpinnerLoader className="w-8 h-8" />
					) : (
						<Trash2Icon className="w-8 h-8" />
					)}
				</figcaption>
			)}
		</figure>
	);
}
