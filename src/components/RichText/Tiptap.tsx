// rich text editor open source and FREE
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { Loader, Loader2, Loader2Icon, LucideLoader2 } from "lucide-react";
import { SpinnerLoader } from "../ui/Loader/Loader";

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
      console.log(editor.getHTML());
    },
  });

  // TODO rotation
  if (!editor) return <SpinnerLoader />;

  return (
    <div role="textbox" className="flex flex-col justify-stretch">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
