import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openCardModalAction,
  setTheSnippetAction,
  setSnippetEditorThemeAction,
} from "../redux/actions.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../styles/cards.css";

function MyCard({ data, toast }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getTheSnippet = (data) => {
    dispatch(setTheSnippetAction(data));
    dispatch(setSnippetEditorThemeAction(user.editorTheme));
    dispatch(openCardModalAction());
  };
  return (
    <div>
      <div className="myCard">
        <div className="myCard-title" onClick={() => getTheSnippet(data)}>
          {data.title}
        </div>
        {/* <div className="mb-2 text-muted myCard-subtitle">{data.language}</div> */}

        <div className="myCard-btn-wrapper">
          {/* <button className="open-it" onClick={() => getTheSnippet(data)}>
            Open
          </button> */}
          <CopyToClipboard text={data.code}>
            <button className="grab-it" onClick={() => toast()}>
              Grab it!
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
