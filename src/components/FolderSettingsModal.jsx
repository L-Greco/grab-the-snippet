import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFolderSettingsModalAction } from "../redux/actions";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import "../styles/folderSettingsModal.css";

function FolderSettingsModal({ folder, folderId }) {
  const FolderSettingsModal = useRef();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const [radioInput, setRadioInput] = useState("");
  const [saveBtnIsLoading, setSaveBtnIsLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);
  function handleClose() {
    setRadioInput("");
    dispatch(toggleFolderSettingsModalAction(false));
  }
  async function handleSave() {}
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
  CloseModalIfClickedOut(FolderSettingsModal);
  if (!page.folderSettingsModalIsOpen) return null;
  return ReactDom.createPortal(
    <div className="modal-overlay">
      <div ref={FolderSettingsModal} className="folder-settings-main-container">
        <div className="account-modal-header">
          <div className="folder-settings-modal-title ">{folder}</div>
          <button className="xbtn-wrapper1" onClick={handleClose}>
            <IconContext.Provider value={{ className: "xbtn1" }}>
              <AiOutlineClose />
            </IconContext.Provider>
          </button>
        </div>
        <div className="radio-container">
          <Form onChange={(e) => setRadioInput(e.target.value)}>
            <Form.Check
              type="radio"
              id="changeFolderName"
              name="settings"
              label="Change folder's name "
              value="name"
            ></Form.Check>
            <Form.Check
              type="radio"
              id="deleteFolder"
              name="settings"
              label="Delete folder"
              value="delete"
            ></Form.Check>
          </Form>
        </div>
        <div className="folder-modal-settings-container">
          {radioInput === "name" && (
            <div className="change-folder-name-container">
              <input
                id="folderNameInput"
                type="text"
                placeholder={`Add a new name`}
                className="mx-auto"
                // value={foldersName}
                // onChange={(e) => setFoldersName(e.target.value)}
              />
              <button
                style={{ width: "70%" }}
                onClick={() => handleSave()}
                className={"save-editor-btn"}
              >
                {saveBtnIsLoading ? (
                  <Spinner id="mySpinner" animation="border" variant="dark" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          )}
          {radioInput === "delete" && (
            <div className="delete-folder-container">
              <p className="deleteFolderAttention">
                Careful you are about to delete folder "{folder}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default FolderSettingsModal;
