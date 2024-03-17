"use client";

import { BoxSelect, CheckCheckIcon, CheckIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { SpinnerLoader } from "../ui/loader/Loader";
import { cn } from "@/utils/libs/tailwind/helper";
import { deleteMediaQuery } from "@/api/queries/mediaQueries";
import { useState, type HTMLAttributes, type PropsWithChildren } from "react";
import type { Media } from "@prisma/client";
import "./MediaOperation.css";
import { set } from "zod";
import { useFilesStore } from "@/contexts/store_files_context";

type Props = HTMLAttributes<HTMLElement> &
	(
		| { removeMediaFromApi: Media["uuid"] | false; selectMedia?: never; editionMedia?: never }
		| { removeMediaFromApi?: never; selectMedia: boolean; editionMedia?: never }
		| { removeMediaFromApi?: never; selectMedia?: never; editionMedia: boolean }
	);

export default function MediaOperation({ removeMediaFromApi, selectMedia, editionMedia, children, className, ...props }: Props) {
	const setFiles = useFilesStore((state) => state.setFiles);
	const [isSelected, setIsSelected] = useState(false);
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
					// @ts-ignore
					if (!children?.props?.id) throw new Error("The image must have an id");
					setIsSelected(!isSelected);
					// @ts-ignore
					setFiles([{id: children.props.id}])
				}

				if (editionMedia) {
				}
			}}
			className={cn("media-operation", className)}
			{...props}
		>
			{children}
			{selectMedia ? (
				<figcaption className={cn(isSelected && "action")}>{isSelected ? <CheckIcon className="w-8 h-8" /> : <PlusIcon className="w-8 h-8" />}</figcaption>
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
