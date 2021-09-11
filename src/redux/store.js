import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { pageManagementReducer, snippetReducer, userReducer } from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
    user: {
        editorTheme: "",
        editorLanguage: "",
        loggedIn: false,
    },
    page: {
        language: "English",
        theme: "",
        cardModalIsOpen: false,
    },
    snippet: {
        title: "",
        editorLanguage: "",
        code: ""
    }

}

const bigReducer = combineReducers({
    page: pageManagementReducer,
    user: userReducer,
    snippet: snippetReducer

})



const configureStore = () => createStore(bigReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default configureStore