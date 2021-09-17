import React, { useRef, useEffect, useState } from "react";
import ReactDom from "react-dom";
import Editor from "./Editor";
import EditorOptions from "./EditorOptions";
import Toast from "react-bootstrap/Toast";
import { connect, useDispatch } from "react-redux";
import {
  closeAddSnippetModalAction,
  setSnippetTitleAction,
  setEditorCodeAction,
  setSnippetCommentsAction,
  setQueryParametersAction,
  emptyTheSnippetAction,
  addSnippetTOArrayAction,
  setUserThemeAction,
} from "../redux/actions";
import { postRequest, putRequest } from "../lib/axios.js";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";
import "../styles/modal.css";
import "../styles/codemirror.css";

let text = require("../data/text.json");

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeAddSnippetModalAction());
  },
  setTitle: (title) => {
    dispatch(setSnippetTitleAction(title));
  },
  setCode: (code) => {
    dispatch(setEditorCodeAction(code));
  },
  setComments: (comments) => {
    dispatch(setSnippetCommentsAction(comments));
  },
  setQuery: (query) => {
    dispatch(setQueryParametersAction(query));
  },
  emptyTheSnippet: (language, theme) => {
    dispatch(emptyTheSnippetAction(language, theme));
  },
  addSnippetToArray: (snippet) => {
    dispatch(addSnippetTOArrayAction(snippet));
  },
  setUserTheme: (theme) => {
    dispatch(setUserThemeAction(theme));
  },
});

function AddSnippetModal({
  page,
  closeModal,
  snippet,
  setTitle,
  user,
  setCode,
  setComments,
  setQuery,
  emptyTheSnippet,
  addSnippetToArray,
  setUserTheme,
}) {
  const addSnippetModalNode = useRef();

  const handleSave = async () => {
    let snippetToSend = {
      title: snippet.title,
      language: snippet.editorLanguage,
      code: snippet.code,
      queryParameters: snippet.queryParameters,
      parent: page.parent,
      comments: snippet.comments,
    };

    try {
      if (user.editorTheme !== snippet.editorTheme) {
        let userTheme = {
          accountSettings: {
            preferredEditorTheme: snippet.editorTheme,
          },
        };
        const res = await putRequest("users/edit", userTheme);
        if (res.status === 200) {
          setUserTheme(snippet.editorTheme);
        }
      }
      let res = await postRequest(`snippets`, snippetToSend);
      if (res.status === 201) {
        addSnippetToArray(res.data);
        closeModal();
        emptyTheSnippet(user.editorLanguage, user.editorTheme);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  CloseModalIfClickedOut(addSnippetModalNode);

  if (!page.addSnippetModalIsOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay">
        <div ref={addSnippetModalNode} className="modal-main-container">
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

            <div className="w-80">
              <EditorOptions />
            </div>
            <div className="w-20"></div>
            <div className="add-Modal-editor-inputs-wrapper ">
              <div className="editor-col">
                <Editor />
              </div>
              <div className="add-Modal-inputs-wrapper ">
                <textarea
                  type="text"
                  placeholder={text.SnippetCard.Comments[page.language]}
                  className="add-snippet-textarea"
                  value={snippet.comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={text.SnippetCard.QueryParameters[page.language]}
                  className="add-snippet-query-input"
                  value={snippet.queryParameters}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  className="clear-editor-btn"
                  onClick={() => setCode("")}
                >
                  Clear
                </button>
                <button
                  onClick={() => handleSave()}
                  className="save-editor-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSnippetModal);
