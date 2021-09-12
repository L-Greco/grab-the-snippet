import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import { useEffect, useState } from "react"
import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setLoggedInAction, setLoggedOffAction } from "./redux/actions.js"
import { getRequest } from "./lib/axios.js"
import { useSelector, useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch()
  const setUser = async () => {
    try {
      const data = await getRequest("users/me")
      if (data.status === 200) {
        dispatch(setLoggedInAction())
        console.log(data.data)
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

      <Route component={LoginPage} path='/' exact />
      <Route component={Home} path='/home' exact />

    </Router>
  );
}

export default App;
