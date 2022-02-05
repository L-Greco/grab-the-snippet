import React, { useState, useEffect, useRef } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
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
  clearUserAction,
} from "../redux/actions";
import { getRequest, postRequest, refreshRequest } from "../lib/axios";
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

  useEffect(() => {
    const onScroll = () => {
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
  // NETWORK ACTIVITY

  useEffect(() => {
    try {
      setUser();
    } catch (error) {
      console.log(error);
    }

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

  // Runs on mounting the component and gets the data
  async function getData() {
    try {
      setIsLoading(true);
      function on200(category, res) {
        if (category === "folder") {
          dispatch(addFoldersArrayAction(res.data));
        }
        if (category === "snippet") {
          dispatch(addSnippetsArrayAction(res.data));
        }
      }
      if (checkIfFolderExists()) {
        const folderResponse = await getRequest(
          `folders/${returnParent("state")}`
        );
        if (!folderResponse.status) {
          const ref = await refreshRequest();

          if (!ref) {
            dispatch(clearUserAction());
          }
          if (ref.status === 200) {
            const res = await getRequest(`folders/${returnParent("state")}`);
            if (res.status === 200) {
              on200("folder", res);
            }
          }
        }
        if (folderResponse.status === 200) {
          on200("folder", folderResponse);
        }

        const res = await getRequest(`snippets/${returnParent("url")}`);
        if (res.status === 200) {
          on200("snippet", res);
        }
        if (!res.status) {
          const ref = await refreshRequest();
          if (!ref) {
            dispatch(clearUserAction());
          }
          if (ref.status === 200) {
            const res = await getRequest(`snippets/${returnParent("url")}`);
            if (res.status === 200) {
              on200("snippet", res);
            }
          }
        }
        setIsLoading(false);
      } else if (page.parent !== "home") {
        history.push("/home");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  // setting the User
  const setUser = async () => {
    // secondary func that runs on status 200
    function on200(res) {
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
    }
    try {
      const res = await getRequest("users/me");

      if (!res.status) {
        const ref = await refreshRequest();
        if (!ref) {
          dispatch(clearUserAction());
        }
        if (ref.status === 200) {
          const res1 = await getRequest("users/me");
          on200(res1);
        }
      }
      if (res.status === 200) {
        on200(res);
      }
    } catch (error) {
      dispatch(clearUserAction());
      alert("Server Error :/");
    }
  };

  // Function for Saving the Folder
  async function handleSaveFolderInput() {
    try {
      function on201(res) {
        handleCloseFolderInput();
        setSaveIsLoading(false);
        dispatch(addFolderTOArrayAction(res.data));
        dispatch(addFolderToUserFoldersArrayAction(res.data));
      }
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
          on201(res);
        }
        if (!res.status) {
          const ref = await refreshRequest();
          if (!ref) {
            dispatch(clearUserAction());
          }
          if (ref.status === 200) {
            const res1 = await postRequest("folders", folderObj);
            if (res1.status === 201) {
              on201(res1);
            } else throw new Error();
          }
        }
      } else {
        handleCloseFolderInput();
        setShowErrorToast(true);
      }
    } catch (error) {
      handleCloseFolderInput();
    }
  }
  // END OF NETWORK ACTIVITY

  // return to top
  const returnToTop = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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

  //
  function findIdOfFolder(name) {
    const { _id } = page.userFolders.filter(
      (folder) => folder.name === name
    )[0];

    if (_id) return _id;
  }
  // Close Folder input and clear the local state
  function handleCloseFolderInput() {
    setFolderInput(false);
    setFoldersName("");
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
  // {
  //   localStorage.getItem("userLanded") && <Redirect to="/loginPage" />;
  // }
  // if (!user.loggedIn) return null;

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
                {findFolderName(2) && (
                  <>
                    child of
                    <Link
                      // style={{
                      //   color: "var(--main-color-blue)",
                      //   marginLeft: "0.5rem",
                      // }}
                      className="parentLink"
                      to={`/folder/${findIdOfFolder(findFolderName(2))}`}
                    >
                      {findFolderName(2)}
                    </Link>
                  </>
                )}
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
