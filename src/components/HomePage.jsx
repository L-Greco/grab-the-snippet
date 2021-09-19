import React, { useState, useEffect, useRef } from "react";
import { withRouter, Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  openAddSnippetModalAction,
  addParentAction,
  addSnippetsArrayAction,
  setEditorLanguageAction,
  setSnippetEditorThemeAction,
  addFoldersArrayAction,
  addFolderTOArrayAction,
} from "../redux/actions";
import { getRequest, postRequest } from "../lib/axios";
// Components
import SnippetModal from "./SnippetModal";
import AddSnippetModal from "./AddSnippetModal";
import Navbar from "./Navbar";
import MyCard from "./MyCard";
import Folder from "./Folder";
// Bootstrap Comps
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
// React Icons
import { TiPlusOutline } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/homePage.css";
import "../styles/cards.css";

let text = require("../data/text.json");

function HomePage({ match, history }) {
  const folderInputNode = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const page = useSelector((state) => state.page);
  const [folderInput, setFolderInput] = useState(false);
  const [foldersName, setFoldersName] = useState("");
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleCloseFolderInput() {
    setFolderInput(false);
    setFoldersName("");
  }
  async function handleSaveFolderInput() {
    try {
      setSaveIsLoading(true);
      const folderObj = {
        name: foldersName,
        parent: page.parent,
      };
      const res = await postRequest("folders", folderObj);
      if (res.status === 201) {
        handleCloseFolderInput();
        setSaveIsLoading(false);
        dispatch(addFolderTOArrayAction(res.data));
      }
    } catch (error) {
      handleCloseFolderInput();
      alert(error);
    }
  }
  function returnParent(string) {
    if (string === "url") {
      if (match.params.folderName) {
        return "folder/" + match.params.folderName;
      } else return "home";
    } else {
      if (match.params.folderName) {
        return match.params.folderName;
      } else return "home";
    }
  }
  function addSnippet() {
    dispatch(setEditorLanguageAction(user.editorLanguage));
    dispatch(setSnippetEditorThemeAction(user.editorTheme));
    dispatch(openAddSnippetModalAction());
  }
  async function getData() {
    try {
      setIsLoading(true);
      console.time("time");
      const folderResponse = await getRequest(
        `folders/parent/${returnParent("state")}`
      );

      if (folderResponse.status === 200) {
        dispatch(addFoldersArrayAction(folderResponse.data));
      }
      const res = await getRequest(`snippets/${returnParent("url")}`);
      if (res.status === 200) {
        dispatch(addSnippetsArrayAction(res.data));
      }
      setIsLoading(false);
      console.timeEnd("time");
    } catch (error) {
      alert(error);
      history.push("/home");
    }
  }
  function folderButton() {
    setFolderInput(true);
    setTimeout(() => {
      document.getElementById("folderInput").focus();
    }, 100);
  }
  function CloseModalIfClickedOut(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleCloseFolderInput();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  CloseModalIfClickedOut(folderInputNode);
  useEffect(() => {
    dispatch(addParentAction(returnParent("state")));
    getData();
  }, [match]);

  if (!user.loggedIn) {
    return <Redirect to="/LoginPage" />;
  }
  return (
    <>
      <SnippetModal />
      <AddSnippetModal />
      <Navbar />
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={1000}
        autohide
      >
        <div className="toast-header">
          Woohooo
          <AiOutlineClose onClick={() => setShowToast(false)} />
        </div>
        <Toast.Body className="text-center"> Copied to clipboard!</Toast.Body>
      </Toast>
      <main className="home-main-container">
        <div className="home-functionality-wrapper">
          <button className="addSnippetBtn" onClick={addSnippet}>
            Add a Snippet!
          </button>

          {!folderInput && (
            <button onClick={() => folderButton()} className="addFolderBtn">
              Add a Folder!
            </button>
          )}

          <div
            ref={folderInputNode}
            className={!folderInput ? "d-none" : "folder-input-wrapper "}
          >
            <input
              id="folderInput"
              type="text"
              placeholder="Add Folder's name..."
              value={foldersName}
              onChange={(e) => setFoldersName(e.target.value)}
            />
            <div className="folder-inputs-wrapper">
              <button onClick={handleSaveFolderInput} className="folder-btn1">
                {saveIsLoading ? (
                  <Spinner id="mySpinner" animation="border" variant="info" />
                ) : (
                  "Save"
                )}
              </button>
              <button className="folder-btn2" onClick={handleCloseFolderInput}>
                <AiOutlineClose />
              </button>
            </div>
          </div>
        </div>

        <div className="home-cards-container">
          {isLoading && (
            <div className="mx-auto">
              <Spinner
                style={{ marginRight: "1rem" }}
                animation="grow"
                variant="light"
              />
              <Spinner
                style={{ marginRight: "1rem" }}
                animation="grow"
                variant="light"
              />
              <Spinner
                style={{ marginRight: "1rem" }}
                animation="grow"
                variant="light"
              />
            </div>
          )}
          {!isLoading && (
            <>
              {page.foldersArray.length > 0 &&
                page.foldersArray.map((folder, i) => (
                  <Folder
                    key={folder._id}
                    data={{
                      ...folder,
                      index: i,
                      elements: page.foldersArray.length,
                    }}
                  />
                ))}
              {page.snippetsArray.length > 0 &&
                page.snippetsArray.map((snippet, i) => (
                  <MyCard
                    key={snippet._id}
                    data={{
                      ...snippet,
                      index: i,
                    }}
                    toast={() => setShowToast(true)}
                  />
                ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default withRouter(HomePage);
