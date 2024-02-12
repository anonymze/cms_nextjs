"use client";

import DropZone from "@/components/DropZone";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@/components/Dialog";
import { PlusCircleIcon } from "lucide-react";
import { useRef } from "react";
import { useFilesStore } from "@/contexts/store_files_context";
import { useMutation } from "@tanstack/react-query";
import { createMediaQuery } from "@/api/queries/mediaQueries";
import type { FormEvent } from "react";

export default function Content({ hideActionButton }: { hideActionButton: boolean }) {
	// files from context
	const files = useFilesStore((state) => state.files);
	const setFiles = useFilesStore((state) => state.setFiles);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const createMutation = useMutation({
		mutationFn: createMediaQuery,
		mutationKey: ["media"],
		meta: {
			message: "Le média a été ajouté",
		},
	});

	const sendFilesToApi = (ev: FormEvent<HTMLFormElement>) => {
		if ((ev.nativeEvent as SubmitEvent)?.submitter?.title === "cancel") return;
		if (files.length <= 0) return;
		createMutation.mutate(files);
	};

	return (
		<>
			<Dialog
				// on close we reset the UI after the transition time of closing the dialog
				onClose={() => setTimeout(() => setFiles([]), 250)}
				onSubmitForm={sendFilesToApi}
				ref={dialogRef}
			>
				<DialogHeader title="Ajouter un média" />
				<DialogBody>
					<DropZone />
				</DialogBody>
				<DialogFooter>
					{/* if files already there we show the button and onclick we launch the input file */}
					{files.length >= 1 && (
						<Button
							secondary
							type="button"
							onClick={({ target }) =>
								(target as HTMLButtonElement).closest("dialog")?.querySelector("input")?.click()
							}
						>
							Ajouter d&apos;autres médias
						</Button>
					)}
				</DialogFooter>
			</Dialog>
			{!hideActionButton && (
				<Button large onClick={() => dialogRef.current?.show()}>
					<PlusCircleIcon className="h-6 w-6 mr-2" /> Ajouter votre premier média
				</Button>
			)}
		</>
	);
}
