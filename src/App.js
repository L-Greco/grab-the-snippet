import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
  return (
    <Router>
      {!loggedIn && <Redirect to='/' />}
      {loggedIn && <Redirect to='/home' />}
      <Route component={LoginPage} path='/loginPage' exact />
      <Route exact path='/home'>
        <Navbar />
        <Home />
      </Route>
      {/* <Route component={Home} path='/home' exact /> */}

    </Router>
  );
}

export default App;
