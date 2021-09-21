import React from "react";
import { withRouter } from "react-router-dom";

function Folder({ data, history }) {
  return (
    <div onClick={() => history.push(`/folder/${data._id}`)} className="folder">
      {data.name}
      <div></div>
    </div>
  );
}

export default withRouter(Folder);
