import Home from "./components/Home";
import { useEffect } from "react"
import WebFont from "webfontloader"

function App() {


  useEffect(() => {
    WebFont.load({
      google: {
        families: [`Rampart One`, `Azeret Mono`]
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
