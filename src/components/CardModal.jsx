import React, { useRef, useEffect } from "react";
import ReactDom from "react-dom";
import Editor from "./Editor";
import { connect } from "react-redux";
import { closeCardModalAction, setSnippetTitleAction } from "../redux/actions";
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
});

function CardModal({ page, closeModal, snippet, setTitle }) {
  const ModalNode = useRef();

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

            <Editor />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
