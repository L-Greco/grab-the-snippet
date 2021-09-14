import React, { useEffect, useRef } from "react";
import "../styles/modal.css";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeAccountModalAction } from "../redux/actions.js";
import { IconContext } from "react-icons"; // this is so i can style the react icon
import { AiOutlineClose } from "react-icons/ai";

function AccountModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const ModalAccountNode = useRef();

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "1rem",
            }}
          >
            <div style={{ marginRight: "0.85rem" }} className="acc-name">
              {state.user.firstName}
            </div>
            <div className="acc-name">{state.user.lastName}</div>
          </div>
          <div className="acc-mail mx-auto">{state.user.email}</div>
        </div>
      </div>
    </div>,

    document.getElementById("portal")
  );
}

export default AccountModal;
