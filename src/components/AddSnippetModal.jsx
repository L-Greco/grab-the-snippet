import React, { useRef, useEffect, useState } from "react";
import ReactDom from "react-dom";
import Editor from "./Editor";
import Toast from "react-bootstrap/Toast";
import { connect, useDispatch } from "react-redux";
import {
  closeAddSnippetModalAction,
  setSnippetTitleAction,
  setEditorLanguageAction,
  setEditorThemeAction,
} from "../redux/actions";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";
import "../styles/modal.css";
import "../styles/codemirror.css";

let text = require("../data/text.json");
let editorData = require("../data/editor.json");
let arrayOfEditorLanguages = editorData["programming-languages-array"];
let arrayOfEditorThemes = editorData["editor-themes"];

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeAddSnippetModalAction());
  },
  setTitle: (title) => {
    dispatch(setSnippetTitleAction(title));
  },
});

function AddSnippetModal({ page, closeModal, snippet, setTitle, user }) {
  const ModalNode = useRef();
  const dispatch = useDispatch();
  function CloseModalIfClickedOut(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  CloseModalIfClickedOut(ModalNode);

  if (!page.cardModalIsOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay">
        <div ref={ModalNode} className="modal-main-container">
          <div className="main-content-modal">
            <div className="modal-header">
              <textarea
                className="modal-title-input"
                value={snippet.title}
                placeholder={text.SnippetCard.Title[page.language]}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button className="xbtn-wrapper" onClick={() => closeModal()}>
                <IconContext.Provider value={{ className: "xbtn" }}>
                  <AiOutlineClose />
                </IconContext.Provider>
              </button>
            </div>
            <div className="add-Modal-inputs-wrapper">
              {/* <input
                type="text"
                placeholder={text.SnippetCard.QueryParameters[page.language]}
                className="add-snippet-query-input"
              /> */}
              <div>
                {" "}
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
                      onChange={(e) =>
                        dispatch(setEditorLanguageAction(e.target.value))
                      }
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
                      onChange={(e) =>
                        dispatch(setEditorThemeAction(e.target.value))
                      }
                      name="themes"
                      id="editor-themes-selector"
                      defaultValue={
                        user.editorTheme
                          ? user.editorTheme
                          : "tomorrow-night-bright"
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
                <Editor />{" "}
              </div>

              <textarea
                type="text"
                placeholder={text.SnippetCard.Comments[page.language]}
                className="add-snippet-textarea"
              />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSnippetModal);
