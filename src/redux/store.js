import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { pageManagementReducer, snippetReducer, userReducer } from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose

export const initialState = {
    user: {
        username: "",
        firstName: "",
        lastName: "",
        avatar: "",
        editorTheme: "",
        editorLanguage: "",
        language: "",
        email: "",
        loggedIn: false,
        _id: "",
        userLanded: false,

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