import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";

function Modal() {
  const ModalNode = useRef();

  function CloseModalIfClickedOut(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // closeModal()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  CloseModalIfClickedOut(ModalNode);

  //   if (boolean that opens and closes the modal ) return null;

  return ReactDom.createPortal(
    <div ref={ModalNode}>Hello World</div>,

    document.getElementById("portal")
  );
}

export default Modal;
