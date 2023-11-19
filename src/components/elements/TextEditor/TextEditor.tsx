import { Editor } from "@tinymce/tinymce-react";
import { FC, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

interface TextEditorProps {
  handleGetEditorContent: (str: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ handleGetEditorContent }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      apiKey="zw1n6nj7t4xsnb4gxl58tq7kh5l48005h4ns2lrqfa9vpnmr"
      onInit={(_evt, editor) => (editorRef.current = editor)}
      // plugins={["textcolor"]}
      init={{
        height: 300,
        menubar: false,
        branding: false,
        statusbar: false,
        inline_styles: true,
        plugins: ["autolink"],
        toolbar:
          "blocks fontsize bold italic underline | forecolor backcolor | align lineheight | checklist numlist bullist indent outdent",
        // Additional configurations...
      }}
      onEditorChange={handleGetEditorContent}
    />
  );
};

export default TextEditor;
