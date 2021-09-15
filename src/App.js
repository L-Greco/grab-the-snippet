import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar"
import NoMatch from "./components/NoMatch";
import StartingPage from "./components/StartingPage";
import { useEffect, useState } from "react"
import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { setLoggedInAction, setLoggedOffAction, setUserAction } from "./redux/actions.js"
import { getRequest } from "./lib/axios.js"
import { useSelector, useDispatch } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const loggedIn = user.loggedIn
  console.log(loggedIn)
  const dispatch = useDispatch()

  const setUser = async () => {
    try {
      const data = await getRequest("users/me")
      if (data.status === 200) {
        console.log(data.data)
        dispatch(setUserAction(data.data))

      } else {
        dispatch(setLoggedOffAction())
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    WebFont.load({
      google: {
        families: [`Rampart One`, `Azeret Mono`, 'Anton', 'Acme', 'Roboto']
      }
    })

    setUser()
  }, [])

  if (!user.userLanded) return null;
  return (
    <>
      {user.userLanded && <Router>
        {/* {!loggedIn && <Redirect to="/" />}
      {loggedIn && */}
        <Switch>
          <Route path="/folder/:folderName">

            <HomePage />
          </Route>
          <Route exact path="/home">

            <HomePage />
          </Route>

          <Route exact path="/">
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
      }
    </>



  );
}

export default App;
