import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserLandedAction,
  setUserCredentialsAction,
} from "../redux/actions.js";
import { Redirect, withRouter } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import { fetchLogin } from "../lib/functions.js";
// Icons

import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose, AiOutlineArrowUp } from "react-icons/ai";
import "../styles/loginPage.css";

function LoginPage({ history }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorNumber, setErrorNumber] = useState("");
  const dispatch = useDispatch();
  // hmm
  const logWithProviderClicked = function () {
    dispatch(setUserLandedAction(true));
    localStorage.setItem("userLanded", true);
  };
  const cleanUp = function () {
    dispatch(setUserCredentialsAction("", ""));
    setShowErrorToast(false);
    setErrorMessage("");
    setLoading(false);
    setErrorNumber("");
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const mail = document.getElementById("loginMail").value;
    const pass = document.getElementById("loginPass").value;
    const res = await fetchLogin(mail, pass, setLoading);
    if (res === 404) {
      setErrorNumber("Oooops 404");
      setErrorMessage("No such User In our Database :(");
      setShowErrorToast(true);
    }
    if (res === 400) {
      setErrorMessage("Wrong Password!");
      setErrorNumber("Oooops 400");
      setShowErrorToast(true);
    }
    if (res === true) {
      logWithProviderClicked();
      history.push("/home");
    }
  };
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, []);
  if (user.loggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <div
        className="d-flex "
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {/* ERROR TOAST HERE */}
        <Toast
          style={{
            backgroundColor: "var(--main-color-orange)",
          }}
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={3000}
          autohide
        >
          <div className="toast-header">
            {errorNumber}
            <AiOutlineClose
              style={{ cursor: "pointer" }}
              onClick={() => setShowErrorToast(false)}
            />
          </div>
          <Toast.Body className="text-center">{errorMessage}</Toast.Body>
        </Toast>

        <h1 className="text-center lph1 " onClick={() => history.push("/")}>
          Grab The Snippet
        </h1>
      </div>
      <div style={{ display: "flex" }}>
        <div className="login-page-container mx-auto">
          <div className="login-page-wrapper">
            <div className="login-1st-span"> Log In to Grab The Snippet</div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  id="loginMail"
                  type="email"
                  placeholder="Enter email"
                  autoComplete="email"
                  defaultValue={user?.email}
                  required
                />
                <Form.Text className="text-muted ">
                  <small>
                    {" "}
                    We'll never share your email with anyone else.{" "}
                  </small>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  id="loginPass"
                  autoComplete="current-password"
                  placeholder="Password"
                  defaultValue={user?.credentials}
                  required
                />
              </Form.Group>

              <button
                type="submit"
                className={
                  loading ? "login-page-button disabled" : "login-page-button"
                }
                disabled={loading}
              >
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span> Loading</span>
                    <Spinner
                      animation="grow"
                      variant="light"
                      style={{
                        height: "0.5rem",
                        width: "0.5rem",
                        marginLeft: "0.5rem",
                      }}
                    />
                    <Spinner
                      animation="grow"
                      variant="light"
                      style={{
                        height: "0.5rem",
                        width: "0.5rem",
                        marginLeft: "0.5rem",
                      }}
                    />

                    <Spinner
                      animation="grow"
                      variant="light"
                      style={{
                        height: "0.5rem",
                        width: "0.5rem",
                        marginLeft: "0.5rem",
                      }}
                    />
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
            </Form>

            <div
              className="text-muted mx-auto mt-3 mb-1"
              style={{ fontSize: "0.8rem" }}
            >
              OR
            </div>

            <a
              onClick={logWithProviderClicked}
              className="login-continue-with-provider text-decoration-none "
              style={{ color: "black" }}
              href={process.env.REACT_APP_BE_URL + "/users/googleLogin"}
            >
              <div className="login-icon-wrapper">
                <FcGoogle />
                <div style={{ marginLeft: "5px" }}>Continue with Google</div>
              </div>
            </a>

            <a
              onClick={logWithProviderClicked}
              className="text-decoration-none login-continue-with-provider"
              style={{ color: "black" }}
              href={process.env.REACT_APP_BE_URL + "/users/githubLogin"}
            >
              <div className="login-icon-wrapper">
                <SiGithub />
                <div style={{ marginLeft: "5px" }}>Continue with GitHub</div>
              </div>
            </a>

            {/* <button className="login-continue-with-provider">
              <div className="login-icon-wrapper">
                <SiLinkedin style={{ color: "rgb(10,102,194)" }} />
                <div style={{ marginLeft: "5px" }}> Continue with LinkedIn</div>
              </div>
            </button> */}

            <div
              style={{ borderBottom: "1px solid grey", marginTop: "1rem" }}
            ></div>

            <div
              onClick={() => history.push("/signUp")}
              className="login-link mx-auto"
            >
              Sign Up for an account
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(LoginPage);
