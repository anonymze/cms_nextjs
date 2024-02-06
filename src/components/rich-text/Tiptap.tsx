// rich text editor open source and FREE
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { SpinnerLoader } from "../ui/loader/Loader";
import { SkeletonCard } from "../ui/skeleton/Skeleton";

interface Props {
	description: string;
	onChange: (richText: string) => void;
}

const Tiptap: React.FC<Props> = ({ description, onChange }) => {
	const editor = useEditor({
		extensions: [
			// maybe change this, granularity needed
			StarterKit.configure({
				heading: {
					HTMLAttributes: {
						class: "text-xl font-bold",
						levels: [3],
					},
				},
			}),
		],
		content: description,
		editorProps: {
			attributes: {
				class: "py-2 px-3 rounded-md border min-h-[9rem] border-input",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	// TODO rotation
	if (!editor) {
		return (
			<>
				<SkeletonCard animated height="2.2rem" />
				<SkeletonCard animated height="9rem" />
			</>
		);
	}

	return (
		<div role="textbox" className="flex flex-col justify-stretch">
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};

export default Tiptap;
