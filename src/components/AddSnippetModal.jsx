import React, { useRef, useEffect, useState } from "react";
import ReactDom from "react-dom";
import Editor from "./Editor";
import EditorOptions from "./EditorOptions";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  closeAddSnippetModalAction,
  setSnippetTitleAction,
  setEditorCodeAction,
  setSnippetCommentsAction,
  setQueryParametersAction,
  emptyTheSnippetAction,
  addSnippetTOArrayAction,
  setUserThemeAction,
  setLoggedOffAction,
} from "../redux/actions";
import { postRequest, putRequest, refreshRequest } from "../lib/axios.js";
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
  setUserLoggedOff: () => {
    dispatch(setLoggedOffAction());
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
  history,
  setUserLoggedOff,
}) {
  const addSnippetModalNode = useRef();

  const [saveBtnIsLoading, setSaveBtnIsLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const handleClose = function () {
    setShowErrorToast(false);
    closeModal();
  };
  const handleSave = async () => {
    if (snippet.title === "" || snippet.code === "") {
      setShowErrorToast(true);
    } else {
      let snippetToSend = {
        title: snippet.title,
        language: snippet.editorLanguage,
        code: snippet.code,
        queryParameters: snippet.queryParameters,
        parent: {
          home: page.parent === "home" ? true : false,
          folderId: page.parent === "home" ? null : page.parent,
        },
        comments: snippet.comments,
      };

      try {
        setSaveBtnIsLoading(true);
        if (user.editorTheme !== snippet.editorTheme) {
          let userTheme = {
            accountSettings: {
              preferredEditorTheme: snippet.editorTheme,
            },
          };
          const res = await putRequest("users/edit", userTheme);
          if (!res.status) {
            const ref = await refreshRequest();
            if (!ref) {
              setUserLoggedOff();
            }
            const res1 = await putRequest("users/edit", userTheme);
            if (res1.status === 200) {
              setUserTheme(snippet.editorTheme);
            }
          }
          if (res.status === 200) {
            setUserTheme(snippet.editorTheme);
          }
        }
        let res = await postRequest(`snippets`, snippetToSend);

        if (!res.status) {
          const ref = await refreshRequest();
          if (!ref) {
            setUserLoggedOff();
          }
          if (ref.status === 200) {
            let res1 = await postRequest(`snippets`, snippetToSend);
            addSnippetToArray(res1.data);
            closeModal();
            emptyTheSnippet(user.editorLanguage, user.editorTheme);
          }
        }
        if (res.status === 201) {
          addSnippetToArray(res.data);
          closeModal();
          emptyTheSnippet(user.editorLanguage, user.editorTheme);
        }

        setSaveBtnIsLoading(false);
      } catch (error) {
        setSaveBtnIsLoading(false);
        console.log(error);
      }
    }
  };
  function CloseModalIfClickedOut(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleClose();
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
          <Toast
            style={{ backgroundColor: "var(--main-color-orange)" }}
            onClose={() => setShowErrorToast(false)}
            show={showErrorToast}
            delay={4000}
            autohide
          >
            <div className="toast-header">
              Oooops
              <AiOutlineClose
                style={{ cursor: "pointer" }}
                onClick={() => setShowErrorToast(false)}
              />
            </div>
            <Toast.Body className="text-center">
              {" "}
              You need to have a title and a code to save a snippet!
            </Toast.Body>
          </Toast>
          <div className="main-content-modal">
            <div className="modal-header">
              <textarea
                className="modal-title-input"
                value={snippet.title}
                placeholder={text.SnippetCard.Title[page.language]}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button className="xbtn-wrapper" onClick={handleClose}>
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

                <button
                  className="clear-editor-btn"
                  onClick={() => setCode("")}
                >
                  Clear
                </button>
                <button
                  onClick={() => handleSave()}
                  className="save-editor-btn"
                  disabled={saveBtnIsLoading}
                >
                  {saveBtnIsLoading ? (
                    <Spinner id="mySpinner" animation="border" variant="dark" />
                  ) : (
                    "Save"
                  )}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddSnippetModal)
);
