import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { pageManagementReducer, snippetReducer, userReducer } from './reducers'

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

export const initialState = {
    user: {
        username: "",
        firstName: "",
        lastName: "",
        avatar: "",
        editorTheme: "",
        editorLanguage: "tomorrow-night-bright",
        language: "",
        email: "",
        loggedIn: false,
        _id: "",
        userLanded: false,
        provider: "",
        credentials: ""

    },
    page: {
        language: "English",
        theme: "",
        cardModalIsOpen: false,
        addSnippetModalIsOpen: false,
        accountModalIsOpen: false,
        folderSettingsModalIsOpen: false,
        parent: "",
        snippetsArray: [],
        foldersArray: [],
        cardModalIsLoading: false,
        userFolders: []

    },
    snippet: {
        title: "",
        editorLanguage: "",
        editorTheme: "",
        code: "",
        comments: "",
        queryParameters: "",
        id: ""


    }

}

const bigReducer = combineReducers({
    page: pageManagementReducer,
    user: userReducer,
    snippet: snippetReducer

})



const configureStore = () => createStore(bigReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default configureStore