import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// react Icons
import { RiFolderSettingsLine } from "react-icons/ri";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";

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

  return (
    <>
      <header
        onClick={returnToTop}
        data-scrolled={!scroll}
        className="pseudoNav"
      >
        <div className="navbar-header-icon-wrapper">
          <img src="/gts1111.png" alt="logo here" className="img-fluid" />
          <div className="navbar-header-sp" data-scrolled={!scroll}>
            {text.HomePage.h1[state.page.language]}
          </div>
        </div>

        <div
          style={{
            fontFamily: "Acme",
            display: "flex",
          }}
        >
          <Link style={{ color: "white" }} to="/loginPage">
            Log In
          </Link>
        </div>
      </header>

      <section id="opening" className="sp-section1 d-flex ">
        <div className="jumbotron mx-auto">
          <div className="container">
            <h1 className="sph1 text-center">
              Grab The Snippet helps developers to thrive!
            </h1>
            <div className="row">
              <div className="col-12 col-md-7">
                <p className="lead">
                  Store your code snippets as cards and have access with just a
                  click!
                </p>
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
                    Login - it's free
                  </button>
                </Link>
              </div>
              <div className="d-none d-md-block col-5 ">
                <img
                  className="img-fluid imgBord"
                  src="pic2.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="links" className="sp-section2 d-flex ">
        <div className="jumbotron mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7">
                <p className="lead">
                  The comment's section inside the card is a link recognizer!
                </p>
                <hr className="my-4" />
                <p>
                  Upon saving, GTS will recognize and activate the links inside
                  the comments!
                </p>
              </div>
              <div className="d-none d-md-block col-5">
                <img
                  className="img-fluid imgBord"
                  src="pic3.png"
                  alt=""
                  style={{ height: "auto" }}
                />
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
              <div className="col-12 col-md-7">
                <p className="lead">
                  Upon entering inside a folder you can click on the settings
                  icon
                  <RiFolderSettingsLine style={{ fontSize: "2rem" }} />
                  and modify the folder.
                </p>

                <hr className="my-4" />
                <p>
                  You can modify the folder while taking care of the snippets
                  inside!
                </p>
              </div>
              <div className="d-none d-md-block col-5">
                <img
                  className="img-fluid imgBord"
                  src="pic5.png"
                  alt=""
                  style={{ height: "auto" }}
                />
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
          {" "}
          <p
            className="lead text-center"
            style={{ fontFamily: "Acme", color: "white" }}
          >
            You can use GTS even in one third of your screen since it's fully
            responsive!
          </p>{" "}
        </div>

        <img
          className="img-fluid mx-auto imgBord "
          src="pic6.png"
          alt=""
          style={{ height: "auto", maxWidth: "70%" }}
        />
      </section>
    </>
  );
}

export default StartingPage;
