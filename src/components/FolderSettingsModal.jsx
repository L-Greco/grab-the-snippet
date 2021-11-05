import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFolderSettingsModalAction,
  changeFolderNameAction,
  setUsersFoldersAction,
} from "../redux/actions";
import { putRequest, deleteRequest, getRequest } from "../lib/axios";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import "../styles/folderSettingsModal.css";
import "../styles/myBootstrap.css";

function FolderSettingsModal({ folder, folderId, history }) {
  const FolderSettingsModal = useRef();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const [radioInput, setRadioInput] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [saveBtnIsLoading, setSaveBtnIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState("home");
  const [radioSnippetManagement, setRadioSnippetManagement] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  function handleClose() {
    setRadioInput("");
    dispatch(toggleFolderSettingsModalAction(false));
  }
  async function handleChange() {}
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

  async function handleDelete() {
    setSaveBtnIsLoading(true);
    try {
      if (radioSnippetManagement === "delete") {
        const res = await deleteRequest(
          `folders/deleteAndSnippets/${folderId}`
        );
        if (res.status === 200) {
          const res2 = await getRequest("users/updateMyFolders");
          if (res2.status === 200) {
            handleClose();
            history.push("/home");

            dispatch(setUsersFoldersAction(res2.data));
          }
        }
      }
      if (
        radioSnippetManagement === "move" ||
        page.snippetsArray.length === 0
      ) {
        const res = await deleteRequest(
          `folders/deleteFolderAndMoveSnippets/${folderId}/${destination}`
        );
        if (res.status === 200) {
          const res2 = await getRequest("users/updateMyFolders");
          if (res2.status === 200) {
            handleClose();
            history.push("/home");
            dispatch(setUsersFoldersAction(res2.data));
          }
        }
      }
      setSaveBtnIsLoading(false);
    } catch (error) {
      setSaveBtnIsLoading(false);
      console.log(error);
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
  function handleRadioInput(e) {
    setRadioInput(e.target.value);
    if (e.target.value === "name") setRadioSnippetManagement("");
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
          <Form onChange={(e) => handleRadioInput(e)}>
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
                nested folders (if there are any) upon deletion will move to the
                Home Page.
              </p>
              {page.snippetsArray.length > 0 && (
                <Form
                  onChange={(e) => setRadioSnippetManagement(e.target.value)}
                >
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
              )}

              {radioSnippetManagement === "move" && (
                <select
                  aria-label="Default select example"
                  className="mt-2 form-select form-select"
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                  size={4}
                  id="selectInput"
                >
                  <option value="home">Home</option>
                  {filterFolderArr().map((fldr) => (
                    <option key={fldr._id + 1} value={fldr._id}>
                      {fldr.name}
                    </option>
                  ))}
                </select>
              )}
              {radioSnippetManagement === "delete" && (
                <p className="deleteFolderAttention">
                  Careful you are about to delete folder "{folder}" and all the
                  snippets inside.
                </p>
              )}
              {(radioSnippetManagement === "delete" ||
                (destination !== "" && radioSnippetManagement === "move") ||
                page.snippetsArray.length === 0) && (
                <button
                  style={{ width: "100%", fontSize: "1rem" }}
                  onClick={handleDelete}
                  className={"clear-editor-btn"}
                >
                  {saveBtnIsLoading ? (
                    <Spinner id="mySpinner" animation="border" variant="dark" />
                  ) : (
                    "Delete"
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

export default withRouter(FolderSettingsModal);
