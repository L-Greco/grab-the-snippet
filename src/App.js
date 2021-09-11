import Home from "./components/Home";
import axios from "axios"
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useEffect } from "react"
import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  const refreshAuthLogic = failedRequest => axios.post(`${process.env.REACT_APP_BE_URL}/users/refreshToken`,).then(tokenRefreshResponse => {
    console.log(tokenRefreshResponse)
    // if (tokenRefreshResponse.status === 401 ) {
    //   set Logged in to false
    // }
    return Promise.resolve();
  });

  createAuthRefreshInterceptor(axios, refreshAuthLogic);

  useEffect(() => {
    WebFont.load({
      google: {
        families: [`Rampart One`, `Azeret Mono`, 'Anton', 'Acme', 'Roboto']
      }
    })
  }, [])
  return (
    <>
      <Home />
    </>
  );
}

export default App;
