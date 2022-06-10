import React, { useRef } from "react";
import Editor1 from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import { setEditorCodeAction } from "../redux/actions";

// main css file
import "../styles/codemirror.css";

function MonacoEditor() {
  const snippet = useSelector((state) => state.snippet);
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  return (
    <div>
      <Editor1
        className="editor"
        onChange={(value, event) => dispatch(setEditorCodeAction(value))}
        onMount={handleEditorDidMount}
        defaultValue={snippet.code}
        language={snippet.editorLanguage}
        height="70vh"
        theme="vs-dark"
      />
    </div>
  );
}

export default MonacoEditor;
