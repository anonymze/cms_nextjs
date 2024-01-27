"use client";
import type { Editor } from "@tiptap/react";
import { Toggle } from "../ui/Toggle";
import { Bold, Heading3, Italic, List, ListOrdered, Strikethrough } from "lucide-react";

interface Props {
	editor: Editor | null;
}

export default function Toolbar({ editor }: Props) {
	if (!editor) return null;

	return (
		<div className="mb-2 border border-input rounded-md">
			<Toggle
				size="sm"
				pressed={editor.isActive("heading")}
				onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
			>
				<Heading3 className="w-4 h-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("bold")}
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className="w-4 h-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("italic")}
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className="w-4 h-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("strike")}
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className="w-4 h-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("bulletList")}
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
			>
				<List className="w-4 h-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("orderedList")}
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrdered className="w-4 h-4" />
			</Toggle>
		</div>
	);
}
