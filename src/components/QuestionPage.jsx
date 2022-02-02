import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
// react Icons
import { RiFolderSettingsLine } from "react-icons/ri";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import "../styles/startingPage.css";
import Navbar from "./Navbar";
let text = require("../data/text.json");
function QuestionPage() {
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

  return (
    <>
      <Navbar />

      <section id="links" className="sp-section2 d-flex ">
        <div className="jumbotron mx-auto">
          <div className="container">
            <div className="row">
              <div className="d-none d-md-block col-5">
                <img
                  className="img-fluid imgBord"
                  src="pic3.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
              <div className="col-12 col-md-7">
                <p className="lead">
                  The comment's section inside the card is a link recognizer!
                </p>
                <div
                  style={{ width: "100%" }}
                  className="d-flex d-md-none col-5 mx-auto  "
                >
                  <img
                    className="img-fluid imgBord mx-auto"
                    src="pic3.png"
                    alt=""
                    style={{ height: "auto" }}
                  />
                </div>
                <hr className="my-4" />
                <p>
                  Upon saving, GTS will recognize and activate the links inside
                  the comments!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="folders" className="sp-section2 d-flex ">
        <div className="jumbotron mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7">
                <p className="lead">GTS provides folder creation.</p>
                <div
                  style={{ width: "100%" }}
                  className="d-flex d-md-none col-5 mx-auto  "
                >
                  <img
                    className="img-fluid imgBord mx-auto"
                    src="pic4.png"
                    alt=""
                    style={{ height: "auto" }}
                  />
                </div>
                <hr className="my-4" />
                <p>You can create nested folders inside previous folders!</p>
              </div>
              <div className="d-none d-md-block col-5">
                <img
                  className="img-fluid imgBord"
                  src="pic4.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
            </div>
            <div style={{ alignItems: "center" }} className="row mt-5">
              <div className="d-none d-md-block col-5">
                <img
                  className="img-fluid imgBord"
                  src="pic5.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
              <div className="col-12 col-md-7">
                <p className="lead">
                  Upon entering inside a folder you can click on the settings
                  icon
                  <RiFolderSettingsLine style={{ fontSize: "2rem" }} />
                  and modify the folder.
                </p>
                <div
                  style={{ width: "100%" }}
                  className="d-flex d-md-none col-5 mx-auto  "
                >
                  <img
                    className="img-fluid imgBord mx-auto"
                    src="pic5.png"
                    alt=""
                    style={{ height: "auto" }}
                  />
                </div>
                <hr className="my-4" />
                <p>
                  You can modify the folder while taking care of the snippets
                  inside!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{ display: "flex", flexDirection: "column", marginTop: "5rem" }}
        id="responsiveness"
      >
        <div>
          <p
            className="lead text-center"
            style={{ fontFamily: "Acme", color: "white" }}
          >
            You can use GTS even in one third of your screen since it's fully
            responsive!
          </p>
        </div>

        <img
          className="img-fluid mx-auto imgBord "
          src="pic6.png"
          alt="..."
          style={{ height: "auto", maxWidth: "70%" }}
        />
      </section>

      <footer className="qpft">
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
      </footer>
      <p style={{ color: "white", fontFamily: "Lobster", textAlign: "center" }}>
        © Copyright 2021. All rights reserved.
      </p>
    </>
  );
}

export default QuestionPage;
