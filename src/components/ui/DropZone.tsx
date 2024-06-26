import { useRef, useCallback, useState, useContext } from "react";
import { Button } from "./Button";
import MediaOperation from "../media-operation/MediaOperation";
import { useFilesStore } from "@/contexts/store_files_context";
import { TYPE_FILES_ACCEPTED, convertFileToBaseType } from "@/utils/web_api/file_resolving";
import { ArrowDownToLineIcon } from "lucide-react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import { type DragEvent, type ChangeEvent } from "react";

export default function DropZone() {
	const lang = useContext(LangContext);
	const [isDraggedOver, setIsDraggedOver] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	// files from context
	const files = useFilesStore((state) => state.files);
	const setFiles = useFilesStore((state) => state.setFiles);
	const removeFile = useFilesStore((state) => state.removeFile);

	const handleFiles = useCallback(
		async (ev: React.ChangeEvent<HTMLInputElement> | React.DragEvent, type: "drop" | "upload") => {
			let fileList: FileList | null;

			switch (type) {
				case "drop":
					ev.preventDefault();
					const eventDrag = ev as DragEvent<HTMLInputElement>;
					fileList = eventDrag.dataTransfer.files;
					// prevent default to avoid opening the file in the browser
					break;
				case "upload":
					const eventChange = ev as ChangeEvent<HTMLInputElement>;
					// we use structuredClone to avoid reference
					fileList = structuredClone(eventChange.currentTarget.files);
					// we reset the input value to be able to upload the same file if necessary
					eventChange.currentTarget.value = "";
					break;
				default:
					return;
			}

			if (!fileList || fileList.length === 0) return;

			const setupFiles = new Array();

			for await (const file of fileList) {
				const base64File = await convertFileToBaseType<string>(file, "base64");

				setupFiles.push({
					id: Math.random().toString(36).substring(2, 9),
					file,
					base64: base64File,
				});
			}

			setFiles(setupFiles);
		},
		[setFiles],
	);

	return (
		<>
			{files.length <= 0 ? (
				<div
					onDrop={async (ev) => {
						ev.preventDefault();
						await handleFiles(ev, "drop");
						setIsDraggedOver(false);
					}}
					// prevent default to avoid opening the file in the browser
					onDragOver={(ev) => {
						ev.preventDefault();
						setIsDraggedOver(true);
					}}
					onDragLeave={(ev) => {
						// ignore event if we're entering a child element
						if (ev.currentTarget.contains(ev.relatedTarget as Node)) return;
						setIsDraggedOver(false);
					}}
					className="grid items-center h-48 text-center rounded-md border-[1px] border-dashed"
				>
					{isDraggedOver ? (
						<ArrowDownToLineIcon className="w-8 h-8 mx-auto" />
					) : (
						<p>
							{i18n[lang]("DROP_FILE")}
							<br />
							{i18n[lang]("OR").toLocaleLowerCase()}
							<br />
							<Button
								onClick={() => inputRef.current?.click()}
								type="button"
								className="mt-1"
								aria-label="Bouton utilisé pour ajouter un fichier local"
							>
								{i18n[lang]("CLICK_HERE_DROP_FILE")}
							</Button>
						</p>
					)}
				</div>
			) : (
				<div className="flex flex-wrap gap-4 min-h-48">
					{files.map((fileTypeStore) => (
						<MediaOperation
							removeMediaFromApi={false}
							key={fileTypeStore.id}
							mediaUuid={fileTypeStore.id}
							onClick={() => removeFile(fileTypeStore.file)}
						>
							<img src={fileTypeStore.base64} alt="" />
						</MediaOperation>
					))}
				</div>
			)}
			{/* we need to put input outside of the logic to access it all the time */}
			<input
				onChange={(ev) => handleFiles(ev, "upload")}
				ref={inputRef}
				name="file"
				type="file"
				accept={TYPE_FILES_ACCEPTED.join(",")}
				hidden
				multiple
				formNoValidate
			/>
		</>
	);
}
