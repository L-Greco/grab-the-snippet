import React, { useRef, useEffect, useState } from "react";
import ReactDom from "react-dom";
import Editor from "./Editor";
import EditorOptions from "./EditorOptions";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import {
  closeCardModalAction,
  setSnippetTitleAction,
  setEditorCodeAction,
  setSnippetCommentsAction,
  setQueryParametersAction,
  emptyTheSnippetAction,
} from "../redux/actions";
import { postRequest } from "../lib/axios.js";
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
}) {
  const ModalNode = useRef();
  const [show, setShow] = useState(false);

  const handleSave = async () => {
    let snippetToSend = {
      title: snippet.title,
      language: snippet.editorLanguage,
      code: snippet.code,
      queryParameters: snippet.queryParameters,
      parent: page.parent,
    };

    try {
      if (user.editorTheme !== snippet.editorTheme) {
      }
      let res = await postRequest(`snippets`, snippetToSend);
      if (res.status === 201) {
        emptyTheSnippet(user.editorLanguage, user.editorTheme);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function handleClose() {
    closeModal();
    emptyTheSnippet(user.editorLanguage, user.editorTheme);
  }
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
  CloseModalIfClickedOut(ModalNode);

  if (!page.cardModalIsOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay">
        <div ref={ModalNode} className="modal-main-container">
          <div className="main-content-modal">
            {page.cardModalIsLoading && (
              <Spinner animation="border" variant="info" />
            )}
            {!page.cardModalIsLoading && (
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
                    <textarea
                      type="text"
                      placeholder={text.SnippetCard.Comments[page.language]}
                      className="add-snippet-textarea"
                      value={snippet.comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder={
                        text.SnippetCard.QueryParameters[page.language]
                      }
                      className="add-snippet-query-input"
                      value={snippet.queryParameters}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    {/* <button
                  className="clear-editor-btn"
                  onClick={() => setCode("")}
                >
                  Clear
                </button> */}
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
                    <button className="clear-editor-btn">Delete</button>
                    <button
                      onClick={() => handleSave()}
                      className="save-editor-btn"
                    >
                      Save Changes
                    </button>
                    <CopyToClipboard text={snippet.code}>
                      <button
                        className="grab-the-snippet-button"
                        onClick={() => setShow(true)}
                      >
                        Grab The Snippet!
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetModal);
