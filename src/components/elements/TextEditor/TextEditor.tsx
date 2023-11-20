import { Editor } from "@tinymce/tinymce-react";
import { useRef, type FC } from "react";
import { type Editor as TinyMCEEditor } from "tinymce";
import { env } from "~/env.mjs";

interface TextEditorProps {
  handleGetEditorContent: (str: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ handleGetEditorContent }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      onEditorChange={handleGetEditorContent}
      apiKey={env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      init={{
        height: 300,
        menubar: false,
        branding: false,
        statusbar: false,
        inline_styles: true,
        plugins: ["autolink"],
        toolbar:
          "blocks fontsize bold italic underline | forecolor backcolor | align lineheight | checklist numlist bullist indent outdent",
      }}
    />
  );
};

export default TextEditor;
