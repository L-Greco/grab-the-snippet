import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFolderSettingsModalAction,
  changeFolderNameAction,
} from "../redux/actions";
import { putRequest } from "../lib/axios";
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
  const [newFolderName, setNewFolderName] = useState("");
  const [saveBtnIsLoading, setSaveBtnIsLoading] = useState(false);
  const [destination, setDestination] = useState("false");
  const [radioSnippetManagement, setRadioSnippetManagement] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  function handleClose() {
    setRadioInput("");
    dispatch(toggleFolderSettingsModalAction(false));
  }

  async function handleSaveNameChange() {
    setSaveBtnIsLoading(true);
    try {
      const obj = {
        name: newFolderName,
      };
      const res = await putRequest(`folders/edit/${folderId}`, obj);
      if (res.status === 201) {
        dispatch(changeFolderNameAction(folderId, newFolderName));
        handleClose();
      }
    } catch (error) {
      alert(error);
    }
  }

  function filterFolderArr() {
    return page.userFolders.filter((fldr) => fldr.name !== folder);
  }
  function focusInput() {
    setTimeout(() => {
      const input = document.getElementById("folderNameInput");
      input.focus();
    }, 150);
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
              onClick={focusInput}
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
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              {newFolderName !== "" && (
                <button
                  style={{ width: "100%", fontSize: "1rem" }}
                  onClick={() => handleSaveNameChange()}
                  className={"save-editor-btn"}
                >
                  {saveBtnIsLoading ? (
                    <Spinner id="mySpinner" animation="border" variant="dark" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              )}
            </div>
          )}
          {radioInput === "delete" && (
            <div className="delete-folder-container">
              <p className="deleteFolderAttention">
                Careful you are about to delete folder "{folder}",
                <br />
                nested folders upon deletion will move to the Home Page
              </p>
              <Form onChange={(e) => setRadioSnippetManagement(e.target.value)}>
                <Form.Check
                  type="radio"
                  id="deleteSnippets"
                  name="uponDeletion"
                  label="Delete snippets inside "
                  value="delete"
                ></Form.Check>
                <Form.Check
                  type="radio"
                  id="moveSnippets"
                  name="uponDeletion"
                  label="move snippets to another folder"
                  value="move"
                ></Form.Check>
              </Form>

              {radioSnippetManagement === "move" && (
                <Form.Select
                  // aria-label="Default select example"
                  className="mt-2"
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                >
                  <option value="">Choose a destination</option>
                  <option value="home">Home</option>
                  {filterFolderArr().map((fldr) => (
                    <option key={fldr._id + 1} value={fldr._id}>
                      {fldr.name}
                    </option>
                  ))}
                </Form.Select>
              )}
              {radioSnippetManagement === "delete" && (
                <p className="deleteFolderAttention">
                  Careful you are about to delete folder "{folder}" and all the
                  snippets inside.
                </p>
              )}
              {(radioSnippetManagement === "delete" ||
                (destination !== "" && radioSnippetManagement === "move")) && (
                <button
                  style={{ width: "100%", fontSize: "1rem" }}
                  onClick={() => handleSaveNameChange()}
                  className={"save-editor-btn"}
                >
                  {saveBtnIsLoading ? (
                    <Spinner id="mySpinner" animation="border" variant="dark" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default FolderSettingsModal;
