import React from "react";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { setUserLandedAction } from "../redux/actions.js";
import { Redirect, withRouter } from "react-router";

// Icons

import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import "../styles/loginPage.css";

function LoginPage({ history }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // hmm
  const logWithProviderClicked = function () {
    dispatch(setUserLandedAction(true));
    localStorage.setItem("userLanded", true);
  };
  if (user.loggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <div
        className="d-flex "
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <h1 className="text-center lph1 " onClick={() => history.push("/")}>
          Grab The Snippet
        </h1>
      </div>
      <div style={{ display: "flex" }}>
        <div className="login-page-container mx-auto">
          <div className="login-page-wrapper">
            <div className="login-1st-span"> Log In to Grab The Snippet</div>
            {/* <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted ">
                  <small>
                    {" "}
                    We'll never share your email with anyone else.{" "}
                  </small>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>

            <button className="login-page-button">Log In</button> */}
            <div
              className="text-muted mx-auto mt-3 mb-1"
              style={{ fontSize: "0.8rem" }}
            >
              {/* OR */}
            </div>
            <button
              onClick={logWithProviderClicked}
              className="login-continue-with-provider"
            >
              <a
                className="text-decoration-none "
                style={{ color: "black" }}
                href={process.env.REACT_APP_BE_URL + "/users/googleLogin"}
              >
                <div className="login-icon-wrapper">
                  <FcGoogle />
                  <div style={{ marginLeft: "5px" }}>Continue with Google</div>
                </div>
              </a>
            </button>
            <button
              onClick={logWithProviderClicked}
              className="login-continue-with-provider"
            >
              <a
                className="text-decoration-none "
                style={{ color: "black" }}
                href={process.env.REACT_APP_BE_URL + "/users/githubLogin"}
              >
                <div className="login-icon-wrapper">
                  <SiGithub />
                  <div style={{ marginLeft: "5px" }}>Continue with GitHub</div>
                </div>
              </a>
            </button>
            {/* <button className="login-continue-with-provider">
              <div className="login-icon-wrapper">
                <SiLinkedin style={{ color: "rgb(10,102,194)" }} />
                <div style={{ marginLeft: "5px" }}> Continue with LinkedIn</div>
              </div>
            </button> */}

            {/*  <div
              style={{ borderBottom: "1px solid grey", marginTop: "1rem" }}
            ></div>

            <div className="login-link mx-auto">Sign Up for an account</div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(LoginPage);
