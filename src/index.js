import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/myBootstrap.css';
import App from './App';
import { Provider } from "react-redux"
import configureStore from "./redux/store"
import WebFont from "webfontloader"

WebFont.load({
  google: {
    families: [`Rampart One`, 'Acme', `Azeret Mono`, 'Anton', 'Roboto', 'Lobster']
  }
})

ReactDOM.render(


  <Provider store={configureStore()}>
    <App />
  </Provider>
  ,
  document.getElementById('root')

);
