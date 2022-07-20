import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getRequest } from "../lib/axios";
import MyCard from "./MyCard.jsx";
import SnippetModal from "./SnippetModal.jsx";
import Toast from "react-bootstrap/Toast";
import { useDispatch } from "react-redux";
import { closeCardModalAction } from "../redux/actions.js";
// react Icons
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import "../styles/startingPage.css";

let text = require("../data/text.json");
function StartingPage({ history }) {
  const [scroll, setScroll] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // NETWORK ACTIVITY
  async function wakeUp() {
    try {
      const res = await getRequest("users/wakingTheDyno");
    } catch (error) {
      console.log(error);
    }
  }
  //END OF NETWORK ACTIVITY

  const returnToTop = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const data1 = {
    title: "Welcome Javascript",
    language: "javascript",
    code: `// with ctrl+/ you can add comments
    console.log("Hello World")`,
    comments: `Comments section here.
    It's also a link recognizer.
    https://www.grabthesnippet.com/`,
  };
  const data2 = {
    title: "Welcome PHP",
    language: "php",
    code: `<!-- with ctrl+/ you can add comments -->
    <?php 
    echo "Hello World"
    ?>`,
    comments: `Comments section here.
    It's also a link recognizer.
    https://www.grabthesnippet.com/`,
  };

  const data3 = {
    title: "Welcome Python",
    language: "python",
    code: `# with ctrl+/ you can add comments
    printf("Hello World")`,
    comments: `Comments section here.
    It's also a link recognizer.
    https://www.grabthesnippet.com/`,
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
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, []);
  function cleanUp() {
    dispatch(closeCardModalAction());
  }
  if (state.user.loggedIn && localStorage.getItem("userLanded") === "true") {
    return <Redirect to="/home" />;
  }
  return (
    <>
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
      <SnippetModal fromStartingPage={true} />
      <header className="pseudoNav">
        <div
          onClick={() => window.location.reload()}
          className="navbar-header-icon-wrapper"
        >
          <img
            src="/gts1111.png"
            alt="logo here"
            className="img-fluid d-none d-sm-block"
          />
          <div className="navbar-header-sp" data-scrolled={false}>
            {text.HomePage.h1[state.page.language]}
          </div>
        </div>

        <div
          className="d-none d-sm-flex"
          style={{
            fontFamily: "Acme",
            display: "flex",
          }}
        >
          <Link onClick={wakeUp} className="splink1" to="/loginPage">
            Log In
          </Link>
          <span>OR</span>
          <Link className="splink1" to="/signUp">
            Sign Up
          </Link>
        </div>
      </header>
      <section id="opening">
        <div className="jumbotron mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7">
                <h1>
                  Grab The Snippet provides developers with a tool for
                  organizing and storing their code snippets as cards.
                </h1>
                <div
                  style={{ width: "100%" }}
                  className="d-flex d-md-none   "
                ></div>

                <hr className="my-4" />
                <p>
                  You can either open the snippet and see the code or copy to
                  clipboard with a click.
                </p>
                <Link className="btn btn-primary " to="/loginPage">
                  Give it a try- it's free
                </Link>
              </div>
              <div
                style={{ color: "black" }}
                className=" cardsWrapper col-md-5 "
              >
                <MyCard toast={() => setShowToast(true)} data={data1} />
                <MyCard toast={() => setShowToast(true)} data={data2} />
                <MyCard toast={() => setShowToast(true)} data={data3} />
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      <footer>
        <div className="mx-auto">
          <span> Designed and built by Kostas M </span>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/konstandinos-makaronas-119064129/"
            rel="noreferrer"
            className="spftlink"
          >
            <AiFillLinkedin style={{ fontSize: "0.9rem" }} />
          </a>
          <a
            target="_blank"
            href="https://github.com/L-Greco"
            rel="noreferrer"
            className="spftlink"
          >
            <AiFillGithub style={{ fontSize: "0.9rem" }} />
          </a>
        </div>
        <span>© Copyright 2021. All rights reserved.</span>
      </footer>
    </>
  );
}

export default StartingPage;
