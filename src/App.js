import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NoMatch from "./components/NoMatch";
import StartingPage from "./components/StartingPage";
import { useEffect } from "react"
import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const loggedIn = user.loggedIn
  console.log(loggedIn)





  useEffect(() => {
    WebFont.load({
      google: {
        families: [`Rampart One`, `Azeret Mono`, 'Anton', 'Acme', 'Roboto', 'Lobster']
      }
    })


  }, [])


  return (
    <>
      <Router>

        <Switch>

          <Route exact path="/">

            <StartingPage />
          </Route>
          <Route path="/folder/:folderName">

            <HomePage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>

          <Route exact path="/test">
            <StartingPage />
          </Route>
          <Route exact path="/loginPage">
            <LoginPage />
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
