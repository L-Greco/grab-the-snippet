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
  addFolderToUserFoldersArrayAction,
  toggleFolderSettingsModalAction,
  setUsersFoldersAction,
  setUserAction,
  setLoggedOffAction,
  setUserLandedAction,
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
import { AiOutlineClose, AiOutlineArrowUp } from "react-icons/ai";
import { RiFolderSettingsLine } from "react-icons/ri";
import { IconContext } from "react-icons"; // this is so i can style the react icon
// css styles
import "../styles/homePage.css";
import FolderSettingsModal from "./FolderSettingsModal";

// let text = require("../data/text.json");

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
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [scroll, setScroll] = useState(1);

  // Component did mount
  useEffect(() => {
    try {
      setUser();
    } catch (error) {
      console.log(error);
    }
    // isUserThere();
    dispatch(setUserLandedAction(true));

    return () => {
      dispatch(setUserLandedAction(false));
    };
  }, []);
  // On mounting it adds the parent on the global state page.parent and then gets the data
  useEffect(() => {
    if (user.loggedIn) {
      dispatch(addParentAction(returnParent("state")));
      getData();
    }
  }, [match, user.loggedIn]);
  // return to top
  const returnToTop = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    const onScroll = () => {
      // console.log(document.documentElement.scrollTop);

      const scrollCheck =
        document.documentElement.scrollTop < 10 || document.body.scrolTop < 10;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [scroll, setScroll]);
  // setting the User
  const setUser = async () => {
    try {
      const res = await getRequest("users/me");

      if (res.status === 200) {
        dispatch(setUsersFoldersAction(res.data.folders));
        dispatch(
          setSnippetEditorThemeAction(
            res.data.accountSettings.preferredEditorTheme
          )
        );
        dispatch(
          setEditorLanguageAction(
            res.data.accountSettings.preferredEditorLanguage
          )
        );
        dispatch(setUserAction(res.data));
        dispatch(setUserLandedAction(true));
      } else {
        dispatch(setUserLandedAction(false));
        dispatch(setLoggedOffAction());
      }
    } catch (error) {
      dispatch(setUserLandedAction(true));
      console.log(error);
    }
  };

  // Finding Folder name through the id
  function findFolderName(a) {
    try {
      if (!page.parent) return null;
      const { name, parent } = page.userFolders.filter(
        (folder) => folder._id === page.parent
      )[0];
      if (!parent.home) {
        const nameOfParent = page.userFolders.filter(
          (folder) => folder._id === parent.folderId
        )[0].name;
        if (a === 1) return `${name}`;
        if (a === 2) return `${nameOfParent}`;
      } else if (a === 1) return `${name}`;
      if (a === 2) return null;
    } catch (error) {
      history.push("/home");
    }
  }
  // Close Folder input and clear the local state
  function handleCloseFolderInput() {
    setFolderInput(false);
    setFoldersName("");
  }
  // Function for Saving the Folder
  async function handleSaveFolderInput() {
    try {
      let filteredArray = page.foldersArray.filter(
        (folder) => folder.name === foldersName
      );
      if (!filteredArray.length > 0) {
        setSaveIsLoading(true);
        const folderObj = {
          name: foldersName,
          parent: {
            home: page.parent === "home" ? true : false,
            folderId: page.parent === "home" ? null : page.parent,
          },
        };
        const res = await postRequest("folders", folderObj);
        if (res.status === 201) {
          handleCloseFolderInput();
          setSaveIsLoading(false);
          dispatch(addFolderTOArrayAction(res.data));
          dispatch(addFolderToUserFoldersArrayAction(res.data));
        }
      } else {
        handleCloseFolderInput();
        setShowErrorToast(true);
      }
    } catch (error) {
      handleCloseFolderInput();
      alert(error);
    }
  }
  // Return Parent from the url
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
  // adds the user preferences for language and theme and opens the snippet modal
  function addSnippet() {
    dispatch(setEditorLanguageAction(user.editorLanguage));
    dispatch(setSnippetEditorThemeAction(user.editorTheme));
    dispatch(openAddSnippetModalAction());
  }
  // checks if the user tries to enter to a non existant folder , if not it redirects to home
  function checkIfFolderExists() {
    if (returnParent("state") === "home") return true;
    const filteredArray = page.userFolders.filter(
      (folder) => folder._id === returnParent("state")
    );

    if (filteredArray.length > 0) {
      return true;
    } else return false;
  }
  // Runs on mounting the component and gets the data
  async function getData() {
    try {
      setIsLoading(true);
      if (checkIfFolderExists()) {
        const folderResponse = await getRequest(
          `folders/${returnParent("state")}`
        );

        if (folderResponse.status === 200) {
          dispatch(addFoldersArrayAction(folderResponse.data));
        }
        const res = await getRequest(`snippets/${returnParent("url")}`);
        if (res.status === 200) {
          dispatch(addSnippetsArrayAction(res.data));
        }
        setIsLoading(false);
      } else if (page.parent !== "home") {
        history.push("/home");
      }
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }
  // Click on folder button
  function folderButton() {
    setFolderInput(true);
    setTimeout(() => {
      document.getElementById("folderInput").focus();
    }, 100);
  }
  // Close the folder input if clicked outside
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

  if (!user.loggedIn && localStorage.getItem("userLanded") === "false") {
    return <Redirect to="/loginPage" />;
  }

  if (!user.loggedIn) return null;

  return (
    <>
      {!scroll && (
        <div className="goToTopBtn" onClick={returnToTop}>
          <IconContext.Provider value={{ className: "arrow" }}>
            <AiOutlineArrowUp />
          </IconContext.Provider>
        </div>
      )}

      <SnippetModal />
      <AddSnippetModal />
      {page.parent !== "home" && page.folderSettingsModalIsOpen && (
        <FolderSettingsModal
          folder={findFolderName(1)}
          folderId={match.params.folderName}
        />
      )}

      <Navbar />
      {/* GRAB THE SNIPPET TOAST HERE */}
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
      {/* ERROR TOAST HERE */}
      <Toast
        style={{ backgroundColor: "var(--main-color-orange)" }}
        onClose={() => setShowErrorToast(false)}
        show={showErrorToast}
        delay={3000}
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
          Seems you have already a folder with the same name here!
        </Toast.Body>
      </Toast>
      <main className="home-main-container">
        <div className="home-functionality-wrapper">
          <div className="home-buttons-folder-wrapper">
            <div style={{ display: "flex" }}>
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
                  <button
                    onClick={handleSaveFolderInput}
                    className="folder-btn1"
                  >
                    {saveIsLoading ? (
                      <Spinner
                        id="mySpinner"
                        animation="border"
                        variant="info"
                      />
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    className="folder-btn2"
                    onClick={handleCloseFolderInput}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </div>
            </div>

            {page.parent !== "home" && (
              <div className="home-folder-settings-wrapper">
                <em>
                  <button
                    onClick={() =>
                      dispatch(toggleFolderSettingsModalAction(true))
                    }
                    className="home-folder-btn"
                  >
                    <div style={{ display: "flex", alignItem: "center" }}>
                      {findFolderName(1)}{" "}
                      <RiFolderSettingsLine style={{ fontSize: "1.2rem" }} />
                    </div>
                  </button>
                </em>
                {findFolderName(2) && <>child of "{findFolderName(2)}" </>}
              </div>
            )}
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
          {page.snippetsArray.length === 0 &&
            page.foldersArray.length === 0 &&
            page.parent !== "home" &&
            !isLoading && <div> This folder is empty :(</div>}
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
