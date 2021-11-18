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

        <div style={{ fontFamily: "Acme", display: "flex" }}>
          <Link to="/loginPage">Log In</Link>
        </div>
      </header>

      <section id="opening" className="sp-section1 d-flex">
        <div class="jumbotron mx-auto">
          <h1>
            Save your snippets once , grab them with a click for a lifetime!
          </h1>
          <p class="lead">
            Save your snippets once , grab them with a click for a lifetime!
          </p>
          <hr class="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <Link to="/loginPage">
            <button class="btn btn-primary " style={{ fontFamily: "Acme" }}>
              Login-it's free
            </button>
          </Link>
        </div>
      </section>
      <section></section>
      <section></section>
      <section></section>
      <div style={{ height: "500px", color: "blue" }}>sss</div>
      <button onClick={() => console.log(scroll)}></button>
      <div style={{ height: "500px", color: "blue" }}>sss</div>
      <button onClick={() => console.log(scroll)}></button>
      <div style={{ height: "500px", color: "blue" }}>sss</div>
      <button onClick={() => console.log(scroll)}></button>
    </>
  );
}

export default StartingPage;
