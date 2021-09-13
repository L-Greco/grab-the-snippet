import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditorLanguageAction,
  setEditorThemeAction,
} from "../redux/actions";
let text = require("../data/text.json");
let editorData = require("../data/editor.json");
let arrayOfEditorLanguages = editorData["programming-languages-array"];
let arrayOfEditorThemes = editorData["editor-themes"];

export default function EditorOptions() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <div className="editor-options-wrapper">
      <div>
        <label
          className="editor-selector-label"
          htmlFor="editor-languages-selector"
        >
          {text.SnippetCard.EditorLanguage.English}
        </label>
        <input
          id="editor-languages-selector"
          list="programming-languages"
          defaultValue={
            user.editorLanguage ? user.editorLanguage : "javascript"
          }
          onChange={(e) => dispatch(setEditorLanguageAction(e.target.value))}
        />
        <datalist id="programming-languages">
          {arrayOfEditorLanguages.map((language) => (
            <option key={language + 1} value={language}></option>
          ))}
        </datalist>{" "}
      </div>

      <div>
        {" "}
        <label
          className="editor-selector-label"
          htmlFor="editor-themes-selector"
        >
          {text.SnippetCard.EditorTheme.English}
        </label>
        <select
          onChange={(e) => dispatch(setEditorThemeAction(e.target.value))}
          name="themes"
          id="editor-themes-selector"
          defaultValue={
            user.editorTheme ? user.editorTheme : "tomorrow-night-bright"
          }
        >
          {arrayOfEditorThemes.map((theme) => (
            <option key={theme + 1} value={theme}>
              {" "}
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
