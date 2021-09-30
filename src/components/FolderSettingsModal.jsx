import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFolderSettingsModalAction } from "../redux/actions";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import "../styles/folderSettingsModal.css";

function FolderSettingsModal({ folder, folderId }) {
  const FolderSettingsModal = useRef();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  function CloseModalIfClickedOut(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(toggleFolderSettingsModalAction(false));
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
  CloseModalIfClickedOut(FolderSettingsModal);
  if (!page.folderSettingsModalIsOpen) return null;
  return ReactDom.createPortal(
    <div className="modal-overlay">
      <div ref={FolderSettingsModal} className="folder-settings-main-container">
        <div className="account-modal-header">
          <div className="folder-settings-modal-title ">{folder}</div>
          <button
            className="xbtn-wrapper1"
            onClick={() => dispatch(toggleFolderSettingsModalAction(false))}
          >
            <IconContext.Provider value={{ className: "xbtn1" }}>
              <AiOutlineClose />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default FolderSettingsModal;
