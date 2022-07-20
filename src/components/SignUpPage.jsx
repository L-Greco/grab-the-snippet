import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { postRequest } from "../lib/axios.js";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { setUserCredentialsAction } from "../redux/actions.js";

// Icons

import "../styles/loginPage.css";
const SignUpPage = ({ history }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLOading] = useState(false);
  const [tick, setTick] = useState(false);
  function on201() {
    setTick(true);
    dispatch(setUserCredentialsAction(form.email, form.password));
    setTimeout(() => {
      history.push("/loginPage");
    }, 2000);
  }
  const handleSubmit = async function (e) {
    e.preventDefault();
    if (!showConfirm) setShowConfirm(true);
    if (showConfirm) {
      setIsLOading(true);
      let objectToSend = {
        profile: {
          userName: form.username,
          email: form.email,
        },
        password: form.password,
      };
      try {
        const res = await postRequest("users/register", objectToSend);
        console.log(JSON.parse(JSON.stringify(res)));
        if (res.status === 201) {
          on201();
        } else if (JSON.parse(JSON.stringify(res.message)).includes("400")) {
          alert("This email address already exists");
        }
      } catch (error) {
        setIsLOading(false);
      }
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    return () => {
      clear();
    };
  }, []);
  const clear = () => {
    setForm({});
    setShowConfirm(false);
    setIsLOading(false);
  };
  return (
    <>
      <div
        className="d-flex "
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <h1
          className="text-center lph1 "
          onClick={() => history.push("/loginPage")}
        >
          Grab The Snippet
        </h1>
      </div>
      <div style={{ display: "flex" }}>
        <div className="login-page-container mx-auto">
          <div className="login-page-wrapper">
            <div className="login-1st-span"> Sign Up</div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  className="mb-3"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                />
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted ">
                  <small>We'll never share your email with anyone else.</small>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                />
              </Form.Group>
              {showConfirm && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    required
                    pattern={`(?<![\w\d])${form.password}(?![\w\d])`}
                    title="Confirm your password"
                  />
                </Form.Group>
              )}
              <div
                style={
                  isLoading
                    ? {
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }
                    : {}
                }
              >
                <button type="submit" className="login-page-button ">
                  Create Account
                </button>

                {isLoading ? (
                  <div
                    className={
                      tick ? "circle-loader load-complete" : "circle-loader"
                    }
                  >
                    <div className={tick ? "checkmark draw" : "draw "}></div>
                  </div>
                ) : (
                  <div> </div>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(SignUpPage);
