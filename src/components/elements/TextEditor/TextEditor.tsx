import dynamic from "next/dynamic";
import { type FC } from "react";
import "react-quill/dist/quill.snow.css";

// If this stops working for some reason, try to use this:
// tinymce-react
// https://www.tiny.cloud/docs/tinymce/6/
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TextEditorProps {
  editorState: string;
  setEditorState: (value: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ editorState, setEditorState }) => {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      // [{ list: "ordered" }, { list: "bullet" }],
      [{ list: "bullet" }],
      // ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["link"],
      // ["code-block"],
      // ['clean'],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={editorState}
      modules={quillModules}
      onChange={setEditorState}
    />
  );
};

export default TextEditor;
