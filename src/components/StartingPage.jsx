import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
            <div className="row">
              <div className="col-12 col-md-7">
                <h1 className="mt-0">
                  Grab The Snippet helps developers to thrive.
                </h1>
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
                    style={{ fontFamily: "Acme" }}
                  >
                    Login-it's free
                  </button>
                </Link>
              </div>
              <div className="d-none d-md-block col-5">
                <img
                  className="img-fluid"
                  src="pic2.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="opening" className="sp-section2 d-flex">
        <div className="jumbotron mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <h1>Grab The Snippet helps developers be faster than ever.</h1>
                <p className="lead">
                  Store your code snippets as cards and have access on them with
                  a click!
                </p>
                <hr className="my-4" />
                <p>
                  You can either open the snippet and see the code or copy the
                  code to clipboard with a click.
                </p>
                <Link to="/loginPage">
                  <button
                    className="btn btn-primary "
                    style={{ fontFamily: "Acme" }}
                  >
                    Login-it's free
                  </button>
                </Link>
              </div>
              <div className="d-none d-md-block col-4">
                <img
                  className="img-fluid"
                  src="pic2.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="opening" className="sp-section1 d-flex">
        <div className="jumbotron mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <h1>Grab The Snippet helps developers be faster than ever.</h1>
                <p className="lead">
                  Store your code snippets as cards and have access on them with
                  a click!
                </p>
                <hr className="my-4" />
                <p>
                  You can either open the snippet and see the code or copy the
                  code to clipboard with a click.
                </p>
                <Link to="/loginPage">
                  <button
                    className="btn btn-primary "
                    style={{ fontFamily: "Acme" }}
                  >
                    Login-it's free
                  </button>
                </Link>
              </div>
              <div className="d-none d-md-block col-4">
                <img
                  className="img-fluid"
                  src="pic2.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{ color: "white" }}
        id="opening"
        className="sp-section1 d-flex"
      >
        <div className="jumbotron mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <h1>Grab The Snippet helps developers be faster than ever.</h1>
                <p className="lead">
                  Store your code snippets as cards and have access on them with
                  a click!
                </p>
                <hr className="my-4" />
                <p>
                  You can either open the snippet and see the code or copy the
                  code to clipboard with a click.
                </p>
                <Link to="/loginPage">
                  <button
                    className="btn btn-primary "
                    style={{ fontFamily: "Acme" }}
                  >
                    Login-it's free
                  </button>
                </Link>
              </div>
              <div className="d-none d-md-block col-4">
                <img
                  className="img-fluid"
                  src="pic2.png"
                  alt=""
                  style={{ height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StartingPage;
