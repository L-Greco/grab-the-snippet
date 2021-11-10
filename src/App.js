import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NoMatch from "./components/NoMatch";
import StartingPage from "./components/StartingPage";
import { useEffect } from "react"
import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { setLoggedOffAction, setUserAction, setSnippetEditorThemeAction, setEditorLanguageAction, setUsersFoldersAction } from "./redux/actions.js"
import { getRequest } from "./lib/axios.js"
import { useSelector, useDispatch } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const loggedIn = user.loggedIn
  console.log(loggedIn)
  const dispatch = useDispatch()




  useEffect(() => {
    WebFont.load({
      google: {
        families: [`Rampart One`, `Azeret Mono`, 'Anton', 'Acme', 'Roboto']
      }
    })

    // setUser()
  }, [])

  // if (!user.userLanded) return null;
  return (
    <>
      <Router>

        <Switch>
          {/* {!user.loggedIn &&
            <Redirect from="/home" to="/loginPage" />
          } */}
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
