import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  closeCardModalAction,
  openCardModalAction,
  closeAddSnippetModalAction,
  openAddSnippetModalAction,
  addParentAction,
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

  async function getData() {
    try {
      const res = await getRequest(`snippets/${returnParent("url")}`);

      console.log(res.data[0]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(addParentAction(returnParent("state")));
    getData();
  }, [match]);

  if (!user.loggedIn || page.language === "russian") {
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
            onClick={() => dispatch(openAddSnippetModalAction())}
          >
            {/* <TiPlusOutline style={{ fontSize: "1.2rem" }} /> */}
            Add a Snippet!
          </button>
          <button
            onClick={() => history.push("/folder/fuck")}
            className="addFolderBtn"
          >
            Add a Folder!
          </button>
        </div>
        <div className="home-cards-container">
          <MyCard />
        </div>
      </main>
    </>
  );
}

export default withRouter(HomePage);
