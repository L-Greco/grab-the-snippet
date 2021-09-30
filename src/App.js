import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NoMatch from "./components/NoMatch";
import StartingPage from "./components/StartingPage";
import { useEffect } from "react"
import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setLoggedOffAction, setUserAction, setSnippetEditorThemeAction, setEditorLanguageAction, setUsersFoldersAction } from "./redux/actions.js"
import { getRequest } from "./lib/axios.js"
import { useSelector, useDispatch } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const loggedIn = user.loggedIn
  console.log(loggedIn)
  const dispatch = useDispatch()

  // const setUser = async () => {
  //   try {
  //     const res = await getRequest("users/me")
  //     if (res.status === 200) {
  //       console.log(res.data)

  //       dispatch(setUsersFoldersAction(res.data.folders))
  //       dispatch(setSnippetEditorThemeAction(res.data.accountSettings.preferredEditorTheme))
  //       dispatch(setEditorLanguageAction(res.data.accountSettings.preferredEditorLanguage))
  //       dispatch(setUserAction(res.data))


  //     } else {
  //       dispatch(setLoggedOffAction())
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }



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
