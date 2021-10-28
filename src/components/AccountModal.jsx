import React, { useEffect, useRef, useState } from "react";
import "../styles/accountModal.css";
import ReactDom from "react-dom";
import Spinner from "react-bootstrap/Spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  closeAccountModalAction,
  setUserLanguageAction,
  setUserThemeAction,
  clearUserAction,
} from "../redux/actions.js";
import { putRequest, postRequest } from "../lib/axios";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";

// let text = require("../data/text.json");
let editorData = require("../data/editor.json");
let arrayOfEditorLanguages = editorData["programming-languages-array"];
let arrayOfEditorThemes = editorData["editor-themes"];

function AccountModal() {
  const state = useSelector((state) => state);
  const [editorLanguage, setEditorLanguage] = useState("");
  const [editorTheme, setEditorTheme] = useState("");
  const [isLoading, setIsLOading] = useState(false);
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      const res = await postRequest("users/logout");
      if (res.status === 200) {
        dispatch(clearUserAction());
      }
    } catch (error) {
      alert(error);
    }
  }

  async function handleSave() {
    setIsLOading(true);
    try {
      let userSettings = {
        accountSettings: {
          preferredEditorTheme: editorTheme,
          preferredEditorLanguage: editorLanguage,
        },
      };
      const res = await putRequest("users/edit", userSettings);
      setIsLOading(false);
      if (res.status === 200) {
        dispatch(setUserThemeAction(editorTheme));
        dispatch(setUserLanguageAction(editorLanguage));
        dispatch(closeAccountModalAction());
      }
    } catch (error) {
      setIsLOading(false);
      alert(error);
    }
  }

  const ModalAccountNode = useRef();
  useEffect(() => {
    setEditorLanguage(state.user.editorLanguage);
    setEditorTheme(state.user.editorTheme);
  }, [state.user]);
  function CloseModalIfClickedOut(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(closeAccountModalAction());
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  CloseModalIfClickedOut(ModalAccountNode);

  if (!state.page.accountModalIsOpen) return null;

  return ReactDom.createPortal(
    <div className="modal-overlay">
      <div ref={ModalAccountNode} className="account-modal-main-container">
        <div className="account-modal-header">
          <div className="account-modal-account">Account</div>
          <button
            className="xbtn-wrapper1"
            onClick={() => dispatch(closeAccountModalAction())}
          >
            <IconContext.Provider value={{ className: "xbtn1" }}>
              <AiOutlineClose />
            </IconContext.Provider>
          </button>
        </div>
        <div className="account-modal-info">
          {state.user.provider === "google" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "1rem",
                }}
              >
                {state.user.firstName !== "" && (
                  <div style={{ marginRight: "0.85rem" }} className="acc-name">
                    {state.user.firstName}
                  </div>
                )}
                {state.user.lastName !== "" && (
                  <div className="acc-name">{state.user.lastName}</div>
                )}
              </div>
              {state.user.email !== "" && (
                <div className="acc-mail mx-auto">{state.user.email}</div>
              )}
            </>
          )}
          {state.user.provider === "github" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "1rem",
                }}
              >
                {state.user.username !== "" && (
                  <div className="acc-name">{state.user.username}</div>
                )}
              </div>
              {state.user.email !== "" && (
                <div className="acc-mail mx-auto">{state.user.email}</div>
              )}
            </>
          )}
        </div>
        <div className="acc-settings">
          <label
            className="acc-editor-selector-label mx-auto"
            htmlFor="acc-modal-editor-selector"
          >
            Default editor language
          </label>
          <input
            id="acc-modal-editor-selector"
            className="mx-auto"
            list="programming-languages"
            defaultValue={state.user.editorLanguage}
            onChange={(e) => setEditorLanguage(e.target.value)}
          />
          <datalist id="programming-languages">
            {arrayOfEditorLanguages.map((language) => (
              <option key={language + 1} value={language}></option>
            ))}
          </datalist>

          <label
            className="acc-editor-selector-label mx-auto"
            htmlFor="acc-editor-themes-selector"
          >
            Default editor theme
          </label>
          <select
            onChange={(e) => setEditorTheme(e.target.value)}
            name="themes"
            className="mx-auto"
            id="acc-editor-themes-selector"
            defaultValue={state.user.editorTheme}
          >
            {arrayOfEditorThemes.map((theme) => (
              <option key={theme + 1} value={theme}>
                {theme}
              </option>
            ))}
          </select>
          {(editorLanguage !== state.user.editorLanguage ||
            editorTheme !== state.user.editorTheme) && (
            <button onClick={handleSave} className="acc-modal-save-btn">
              {isLoading ? (
                <Spinner id="mySpinner" animation="border" variant="dark" />
              ) : (
                "Save Changes"
              )}
            </button>
          )}
        </div>
        <button onClick={handleLogout} className="acc-modal-logOut-btn">
          Logout
        </button>
      </div>
    </div>,

    document.getElementById("portal")
  );
}

export default AccountModal;
