import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NoMatch from "./components/NoMatch";
import StartingPage from "./components/StartingPage";
import QuestionPage from "./components/QuestionPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";


function App() {

  return (
    <>
      <Router>

        <Switch>



          <Route exact path="/">
            <StartingPage />
          </Route>
          <Route exact path="/questionPage">
            <QuestionPage />
          </Route>
          {localStorage.getItem("userLanded") && <Route path="/folder/:folderName">

            <HomePage />
          </Route>}

          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/loginPage">
            <LoginPage />
          </Route>
          <Route exact path="/signUp">
            <SignUpPage />
          </Route>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>

      </Router>

    </>



  );
}

export default App;
