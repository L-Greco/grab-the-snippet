import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  closeCardModalAction,
  openCardModalAction,
  closeAddSnippetModalAction,
  openAddSnippetModalAction,
  addParentAction,
  addSnippetsArrayAction,
  setEditorLanguageAction,
  setSnippetEditorThemeAction,
} from "../redux/actions";
import { getRequest } from "../lib/axios";
// Components
import SnippetModal from "./SnippetModal";
import AddSnippetModal from "./AddSnippetModal";
import Navbar from "./Navbar";
import MyCard from "./MyCard";
// React Icons
import { TiPlusOutline } from "react-icons/ti";
import "../styles/homePage.css";

let text = require("../data/text.json");

function HomePage({ match, history }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const page = useSelector((state) => state.page);
  const [parent, setParent] = useState("");
  const [snippetsArray, setSnippetsArray] = useState([]);
  const [foldersArray, setFoldersArray] = useState([]);

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
      const res = await getRequest(`snippets/${returnParent("url")}`);
      if (res.status === 200) {
        dispatch(addSnippetsArrayAction(res.data));
      }
    } catch (error) {
      alert(error);
      history.push("/home");
    }
  }

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
      <main className="home-main-container">
        <div className="home-functionality-wrapper">
          <button
            className="addSnippetBtn"
            // disabled={true}
            onClick={addSnippet}
          >
            {/* <TiPlusOutline style={{ fontSize: "1.2rem" }} /> */}
            Add a Snippet!
          </button>
          <button
            onClick={() => history.push("/folder/strive")}
            className="addFolderBtn"
          >
            Add a Folder!
          </button>
        </div>
        <div className="home-cards-container">
          {page.foldersArray.length > 0 &&
            page.foldersArray.map((snippet, i) => (
              <MyCard key={snippet._id} data={{ ...snippet, index: i }} />
            ))}
          {page.snippetsArray.length > 0 &&
            page.snippetsArray.map((snippet, i) => (
              <MyCard key={snippet._id} data={{ ...snippet, index: i }} />
            ))}
        </div>
      </main>
    </>
  );
}

export default withRouter(HomePage);
