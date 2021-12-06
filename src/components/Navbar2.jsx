import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import "../styles/navbar.css";
let text = require("../data/text.json");

function Navbar2({ history }) {
  const state = useSelector((state) => state);

  return (
    <div className="navbar-wrapper">
      <div
        className="navbar-header-icon-wrapper mx-auto"
        onClick={() =>
          state.user.loggedIn === true
            ? history.push("/home")
            : history.push("/loginPage")
        }
      >
        <img src="/gts1111.png" alt="logo here" className="img-fluid" />
        <div className="navbar-header">
          {text.HomePage.h1[state.page.language]}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Navbar2);
