import React, { useRef, useEffect, useState } from "react";
import ReactDom from "react-dom";
import Editor from "./Editor";
import EditorOptions from "./EditorOptions";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import Linkify from "react-linkify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import {
  closeCardModalAction,
  setSnippetTitleAction,
  setEditorCodeAction,
  setSnippetCommentsAction,
  setQueryParametersAction,
  emptyTheSnippetAction,
  removeSnippetFromArrayAction,
  setUserThemeAction,
  replaceSnippetFromArrayAction,
} from "../redux/actions";
import { deleteRequest, putRequest } from "../lib/axios.js";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";
import "../styles/modal.css";

let text = require("../data/text.json");

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeCardModalAction());
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
  removeSnippet: (id) => {
    dispatch(removeSnippetFromArrayAction(id));
  },
  setUserTheme: (theme) => {
    dispatch(setUserThemeAction(theme));
  },
  replaceSnippet: (snippet) => {
    dispatch(replaceSnippetFromArrayAction(snippet));
  },
});

function SnippetModal({
  page,
  closeModal,
  snippet,
  setTitle,
  user,
  setCode,
  setComments,
  setQuery,
  emptyTheSnippet,
  index,
  removeSnippet,
  setUserTheme,
  replaceSnippet,
}) {
  const ModalNode = useRef();
  const smallDeleteMOdal = useRef();
  const commentsNode = useRef();
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [snippetIsChanged, setSnippetIsChanged] = useState(false);
  const [editorChanged, setEditorChanged] = useState(false);
  const [saveBtnIsLoading, setSaveBtnIsLoading] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);

  function checkIfChanged() {
    if (page.cardModalIsOpen) {
      const snippetBefore = page.snippetsArray.filter(
        (PageSnippet) => PageSnippet._id === snippet.id
      )[0];

      if (
        snippetBefore.code !== snippet.code ||
        snippetBefore.title !== snippet.title ||
        snippetBefore.language !== snippet.editorLanguage ||
        snippetBefore.comments !== snippet.comments
      ) {
        setSnippetIsChanged(true);
      } else setSnippetIsChanged(false);
      if (user.editorTheme !== snippet.editorTheme) {
        setEditorChanged(true);
      } else setEditorChanged(false);
    }
  }
  const handleSave = async () => {
    setSaveBtnIsLoading(true);
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
      if (editorChanged) {
        let userTheme = {
          accountSettings: {
            preferredEditorTheme: snippet.editorTheme,
          },
        };
        const res = await putRequest("users/edit", userTheme);
        if (res.status === 200) {
          setUserTheme(snippet.editorTheme);
          if (!snippetIsChanged) {
            setSaveBtnIsLoading(false);
            handleClose();
          }
        }
      }
      if (snippetIsChanged) {
        let res = await putRequest(
          `snippets/edit/${snippet.id}`,
          snippetToSend
        );
        if (res.status === 201) {
          replaceSnippet({ ...snippetToSend, _id: snippet.id });
          setSaveBtnIsLoading(false);
          handleClose();
        } else setSaveBtnIsLoading(false);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  function handleClose() {
    closeModal();
    emptyTheSnippet(user.editorLanguage, user.editorTheme);
    setShowDeleteModal(false);
    setShowTextArea(false);
  }
  // Function for Deleting the Snippet
  async function handleDelete() {
    try {
      const res = await deleteRequest(`snippets/delete/${snippet.id}`);

      if (res.status === 200) {
        removeSnippet(snippet.id);
        handleClose();
      } else if (res.status === 404) {
        alert(`Error 404 : "Snippet not found!"`);
      }
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    checkIfChanged();
  }, [snippet]);
  function CloseModalIfClickedOut(ref1, ref2, ref3) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref1.current && !ref1.current.contains(event.target)) {
          handleClose();
          setShowDeleteModal(false);
        }
        if (ref2.current && !ref2.current.contains(event.target)) {
          setShowDeleteModal(false);
        }
        if (ref3.current && !ref3.current.contains(event.target)) {
          setShowTextArea(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref1, ref2, ref3]);
  }
  CloseModalIfClickedOut(ModalNode, smallDeleteMOdal, commentsNode);
  // CloseModalIfClickedOut(smallDeleteMOdal);

  if (!page.cardModalIsOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay">
        <div ref={ModalNode} className="modal-main-container">
          <div className="main-content-modal">
            {showDeleteModal && (
              <div className="delete-modal-overlay">
                <div ref={smallDeleteMOdal} className="small-delete-modal">
                  <div>Are you sure you want to delete this snippet?</div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      style={{ width: "35%" }}
                      onClick={handleDelete}
                      className="addSnippetBtn"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="addFolderBtn"
                      style={{ width: "35%" }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div>
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
                  <div
                    className="textarea-node"
                    ref={commentsNode}
                    onClick={() => setShowTextArea(true)}
                  >
                    {!showTextArea && (
                      <div
                        placeholder={text.SnippetCard.Comments[page.language]}
                        className="div-textarea"
                      >
                        {snippet.comments === "" && (
                          <span
                            style={{
                              fontSize: "0.7rem",
                              fontFamily: "Acme",
                              color: "rgba(0,0,0,0.6)",
                            }}
                          >
                            {text.SnippetCard.Comments[page.language]}{" "}
                          </span>
                        )}

                        <Linkify
                          componentDecorator={(
                            decoratedHref,
                            decoratedText,
                            key
                          ) => (
                            <a target="blank" href={decoratedHref} key={key}>
                              {decoratedText}
                            </a>
                          )}
                        >
                          {snippet.comments}
                        </Linkify>
                      </div>
                    )}
                    {showTextArea && (
                      <textarea
                        autoFocus
                        type="text"
                        placeholder={text.SnippetCard.Comments[page.language]}
                        value={snippet.comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="add-snippet-textarea"
                      />
                    )}
                  </div>

                  <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={1000}
                    autohide
                  >
                    <div className="toast-header">
                      Copied to clipboard!
                      {/* <AiOutlineClose onClick={() => setShow(false)} /> */}
                    </div>
                    {/* <Toast.Body className="text-center"></Toast.Body> */}
                  </Toast>
                  <button
                    className="clear-editor-btn"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleSave()}
                    className={
                      snippetIsChanged || editorChanged
                        ? "save-editor-btn"
                        : "d-none"
                    }
                  >
                    {saveBtnIsLoading ? (
                      <Spinner
                        id="mySpinner"
                        animation="border"
                        variant="dark"
                      />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <CopyToClipboard text={snippet.code}>
                    <button
                      className="grab-the-snippet-button"
                      onClick={() => setShow(true)}
                    >
                      Grab it!
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetModal);
