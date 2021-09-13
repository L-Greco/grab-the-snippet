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
} from "../redux/actions";
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
});

function AddSnippetModal({
  page,
  closeModal,
  snippet,
  setTitle,
  user,
  setCode,
}) {
  const ModalNode = useRef();
  const dispatch = useDispatch();
  const [btnAction, setBtnAction] = useState(false);
  function triggerBtnAction() {
    btnAction ? setBtnAction(false) : setBtnAction(true);
  }
  function CloseModalIfClickedOut(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          triggerBtnAction();
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

            <div style={{ width: "80%" }}>
              <EditorOptions />
            </div>
            <div style={{ width: "20%" }}></div>
            <div className="add-Modal-editor-inputs-wrapper ">
              <div className="editor-col">
                <Editor buttonAction={btnAction} />
              </div>
              <div className="add-Modal-inputs-wrapper ">
                <textarea
                  type="text"
                  placeholder={text.SnippetCard.Comments[page.language]}
                  className="add-snippet-textarea"
                />
                <input
                  type="text"
                  placeholder={text.SnippetCard.QueryParameters[page.language]}
                  className="add-snippet-query-input"
                />
                <button
                  className="clear-editor-btn"
                  onClick={() => setCode("")}
                >
                  Clear
                </button>
                <button
                  className="save-editor-btn"
                  onClick={() => triggerBtnAction()}
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
