"use client";

import { CheckIcon, Edit2Icon, Edit3Icon, EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useMutation, type MutationKey } from "@tanstack/react-query";
import { SpinnerLoader } from "../ui/loader/Loader";
import { cn } from "@/utils/libs/tailwind/helper";
import { deleteMediaQuery } from "@/api/queries/mediaQueries";
import { useFilesStore } from "@/contexts/store_files_context";
import { deleteMediaDetailsQuery } from "@/api/queries/mediaDetailsQueries";
import { i18n } from "@/i18n/translations";
import { LangContext } from "@/utils/providers";
import { useContext } from "react";
import type { Media, Media_Details } from "@prisma/client";
import { type HTMLAttributes } from "react";
import "./MediaOperation.css";

type Props = HTMLAttributes<HTMLElement> &
	(
		| {
				mediaUuid: Media["uuid"];
				removeMediaFromApi: boolean;
				mutationKey?: never;
				selectMedia?: never;
				editionMedia?: never;
				mediaDetailsUuid?: never;
		  }
		| {
				mediaUuid: Media["uuid"];
				selectMedia: boolean;
				mutationKey?: never;
				removeMediaFromApi?: never;
				editionMedia?: never;
				mediaDetailsUuid?: never;
		  }
		| {
				mediaDetailsUuid: Media_Details["uuid"];
				removeMediaFromApi: boolean;
				mutationKey: MutationKey
				selectMedia?: never;
				editionMedia: boolean;
				mediaUuid?: never;
		  }
	);

export default function MediaOperation({
	mediaUuid,
	mediaDetailsUuid,
	removeMediaFromApi,
	mutationKey,
	selectMedia,
	editionMedia,
	className,
	children,
	...props
}: Props) {
	const lang = useContext(LangContext);
	const files = useFilesStore((state) => state.files);
	const isSelected = files.find((file) => file.id === mediaUuid);
	const setFiles = useFilesStore((state) => state.setFiles);
	const removeFile = useFilesStore((state) => state.removeFile);

	const deleteMediaMutation = useMutation({
		mutationFn: deleteMediaQuery,
		mutationKey: ["media"],
		meta: {
			message: i18n[lang]("MEDIA_DELETED"),
		},
	});

	const deleteMediaDetailsMutation = useMutation({
		mutationFn: deleteMediaDetailsQuery,
		mutationKey,
		meta: {
			message: i18n[lang]("MEDIA_DETAILS_DELETED"),
		},
	});

	return (
		<figure
			onClick={async () => {
				// if media details we will handle the onclick directly on the buttons edit and delete
				if (mediaDetailsUuid) return;

				if (removeMediaFromApi && mediaUuid) deleteMediaMutation.mutate(mediaUuid);

				if (selectMedia) {
					if (isSelected) {
						removeFile(isSelected.file);
					} else {
						// we set fake data because we only need the id to manipulate the media
						setFiles([{ id: mediaUuid, base64: "", file: new File([""], "") }]);
					}
				}
			}}
			className={cn(
				"media-operation",
				selectMedia ? "select-mode" : editionMedia ? "edition-mode" : "remove-mode",
				className,
			)}
			{...props}
		>
			{children}
			{selectMedia ? (
				<figcaption className={cn(isSelected && "action")}>
					{isSelected ? <CheckIcon className="w-8 h-8" /> : <PlusIcon className="w-8 h-8" />}
				</figcaption>
			) : editionMedia ? (
				<figcaption className={cn(deleteMediaDetailsMutation.isPending && "action")}>
					{deleteMediaDetailsMutation.isSuccess || deleteMediaDetailsMutation.isPending ? (
						<SpinnerLoader className="w-8 h-8" />
					) : (
						<>
							<button
								aria-label="edit"
								type="button"
								onClick={() => {
									console.log("edit");
								}}
							>
								<EditIcon className="w-6 h-6" />
							</button>
							<button
								aria-label="delete"
								type="button"
								onClick={() => {
									deleteMediaDetailsMutation.mutate(mediaDetailsUuid);
								}}
							>
								<Trash2Icon className="w-6 h-6" />
							</button>
						</>
					)}
				</figcaption>
			) : (
				<figcaption className={cn(deleteMediaMutation.isPending && "action")}>
					{deleteMediaMutation.isSuccess || deleteMediaMutation.isPending ? (
						<SpinnerLoader className="w-8 h-8" />
					) : (
						<Trash2Icon className="w-8 h-8" />
					)}
				</figcaption>
			)}
		</figure>
	);
}
