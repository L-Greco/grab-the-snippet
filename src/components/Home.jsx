import React from "react";
import { connect } from "react-redux";
import {
  closeCardModalAction,
  openCardModalAction,
  closeAddSnippetModalAction,
  openAddSnippetModalAction,
} from "../redux/actions";
import SnippetModal from "./SnippetModal";
import AddSnippetModal from "./AddSnippetModal";
import "../styles/homePage.css";

let text = require("../data/text.json");

const mapDispatchToProps = (dispatch) => ({
  openModal: () => {
    dispatch(openAddSnippetModalAction());
  },
  closeModal: () => {
    dispatch(closeAddSnippetModalAction());
  },
});

function Home({ openModal }) {
  return (
    <div>
      <div>
        <h1 style={{ fontFamily: "Rampart One" }}>
          {text.HomePage.h1.English}
        </h1>
        <button className="addSnippetBtn" onClick={() => openModal()}>
          open Modal
        </button>
        <AddSnippetModal />
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Home);
