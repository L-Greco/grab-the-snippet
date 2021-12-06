import React, { useEffect, useState } from "react";
import AccountModal from "./AccountModal";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { openAccountModalAction } from "../redux/actions";
import "../styles/navbar.css";
let text = require("../data/text.json");

function Navbar({ history }) {
  const [acc, setAcc] = useState("");

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  function returnCapitals(user) {
    if (user.provider === "google") {
      let firstName = user.firstName;
      let lastName = user.lastName;
      let myString = firstName.charAt(0) + " " + lastName.charAt(0);
      setAcc(myString.toUpperCase());
    }
    if (user.provider === "github") {
      setAcc(user.username.charAt(0).toUpperCase());
    }
  }

  useEffect(() => {
    returnCapitals(state.user);
  }, [state.user]);

  return (
    <div className="navbar-wrapper">
      <div
        className="navbar-header-icon-wrapper mx-auto"
        onClick={() =>
          state.page.parent !== "home" ? history.push("/home") : null
        }
      >
        <img src="/gts1111.png" alt="logo here" className="img-fluid" />
        <div className="navbar-header">
          {text.HomePage.h1[state.page.language]}
        </div>
      </div>
      <div
        onClick={() => dispatch(openAccountModalAction())}
        className="navbar-account"
      >
        <div className="text-center"> ACC</div>
      </div>
      <AccountModal />
    </div>
  );
}

export default withRouter(Navbar);
