import React from "react";
import { connect } from "react-redux";
import { closeCardModalAction, openCardModalAction } from "../redux/actions";
import CardModal from "./CardModal";
import "../styles/homePage.css";

let text = require("../data/text.json");

const mapDispatchToProps = (dispatch) => ({
  openModal: () => {
    dispatch(openCardModalAction());
  },
  closeModal: () => {
    dispatch(closeCardModalAction);
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
        <CardModal />
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Home);
