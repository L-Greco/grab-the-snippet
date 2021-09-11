import React, { useState } from "react";
import Form from "react-bootstrap/Form";
// Icons
import { SiLinkedin } from "react-icons/si";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import "../styles/loginPage.css";

function LoginPage() {
  return (
    <>
      <h1 className="text-center" style={{ fontFamily: "Rampart One" }}>
        Grab The Snippet
      </h1>
      <div className="login-page-container">
        <div className="login-page-wrapper">
          <div className="login-1st-span"> Log In to Grab The Snippet</div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted ">
                <small> We'll never share your email with anyone else. </small>
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>

          <button className="login-page-button">Log In</button>
          <div
            className="text-muted mx-auto mt-3 mb-1"
            style={{ fontSize: "0.8rem" }}
          >
            OR
          </div>
          <button className="login-continue-with-provider">
            <div className="login-icon-wrapper">
              <FcGoogle
              //   style={{ color: "rgb(10,102,194)" }}
              />
              <div style={{ marginLeft: "5px" }}>Continue with Google</div>
            </div>
          </button>
          <button className="login-continue-with-provider">
            <div className="login-icon-wrapper">
              <SiGithub
              //   style={{ color: "rgb(10,102,194)" }}
              />
              <div style={{ marginLeft: "5px" }}>Continue with GitHub</div>
            </div>
          </button>
          <button className="login-continue-with-provider">
            <div className="login-icon-wrapper">
              <SiLinkedin style={{ color: "rgb(10,102,194)" }} />
              <div style={{ marginLeft: "5px" }}> Continue with LinkedIn</div>
            </div>
          </button>

          <div
            style={{ borderBottom: "1px solid grey", marginTop: "1rem" }}
          ></div>

          <div className="login-link mx-auto">Sign Up for an account</div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
