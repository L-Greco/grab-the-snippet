import React from "react";
import { useDispatch } from "react-redux";
import {
  openCardModalAction,
  closeCardModalAction,
  cardModalisLoadingAction,
  setTheSnippetAction,
} from "../redux/actions.js";
import { getRequest } from "../lib/axios.js";
import Card from "react-bootstrap/Card";
import SnippetModal from "./SnippetModal";

function MyCard({ data }) {
  const dispatch = useDispatch();

  const getTheSnippet = (data) => {
    dispatch(setTheSnippetAction(data));
    console.log(data.index);
    dispatch(openCardModalAction());
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {data.language}
          </Card.Subtitle>
          {/* <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text> */}
          {/* <Card.Link href="#">Card Link</Card.Link> */}
          <button onClick={() => getTheSnippet(data)}>oopen</button>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyCard;
