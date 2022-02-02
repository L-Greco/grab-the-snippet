import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
// react Icons
import { RiFolderSettingsLine } from "react-icons/ri";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import "../styles/startingPage.css";
let text = require("../data/text.json");
function StartingPage() {
  const [scroll, setScroll] = useState(1);
  const state = useSelector((state) => state);
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
  if (state.user.loggedIn && localStorage.getItem("userLanded") === "true") {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <header className="pseudoNav">
        <div
          onClick={() => window.location.reload()}
          className="navbar-header-icon-wrapper"
        >
          <img src="/gts1111.png" alt="logo here" className="img-fluid" />
          <div className="navbar-header-sp" data-scrolled={false}>
            {text.HomePage.h1[state.page.language]}
          </div>
        </div>

        <div
          style={{
            fontFamily: "Acme",
            display: "flex",
          }}
        >
          <Link className="splink1" to="/loginPage">
            Log In
          </Link>
        </div>
      </header>
      <section id="opening" className="sp-section1 d-flex ">
        <div className="jumbotron mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7">
                <h1 style={{ fontWeight: "500" }}>
                  Grab The Snippet provides developers with a tool for
                  organizing and storing their code in the form of cards.
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
                <Link to="/loginPage">
                  <button
                    className="btn btn-primary "
                    style={{ fontFamily: "Acme", width: "50%" }}
                  >
                    Give it a try- it's free
                  </button>
                </Link>
              </div>
              <div className="d-none d-md-block col-5 ">
                <img
                  className="img-fluid imgBord"
                  src="mockup.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="spft">
        <div className="mx-auto">
          {" "}
          Designed and built by L-Greco
          <a
            target="_blank"
            href="https://www.linkedin.com/in/konstandinos-makaronas-119064129/"
            rel="noreferrer"
            className="spftlink"
          >
            <AiFillLinkedin />
          </a>
          <a
            target="_blank"
            href="https://github.com/L-Greco"
            rel="noreferrer"
            className="spftlink"
          >
            <AiFillGithub />
          </a>{" "}
        </div>
        <p
          style={{
            color: "white",
            fontFamily: "Lobster",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          © Copyright 2021. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default StartingPage;
