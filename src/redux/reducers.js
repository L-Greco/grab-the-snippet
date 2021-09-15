import { initialState } from "./store";

export const pageManagementReducer = (state = initialState.page, action) => {
    switch (action.type) {
        case `OPEN_CARD_MODAL`:
            return {
                ...state,
                cardModalIsOpen: true
            }
        case `CLOSE_CARD_MODAL`:
            return {
                ...state,
                cardModalIsOpen: false
            }
        case `OPEN_ADD_A_SNIPPET_MODAL`:
            return {
                ...state,
                addSnippetModalIsOpen: true
            }
        case `CLOSE_ADD_A_SNIPPET_MODAL`:
            return {
                ...state,
                addSnippetModalIsOpen: false
            }
        case `OPEN_ACCOUNT_MODAL`:
            return {
                ...state,
                accountModalIsOpen: true
            }
        case `CLOSE_ACCOUNT_MODAL`:
            return {
                ...state,
                accountModalIsOpen: false
            }
        case `ADD_PARENT`:
            return {
                ...state,
                parent: action.payload
            }
        case `ADD_SNIPPETS_ARRAY`:
            return {
                ...state,
                snippetsArray: action.payload
            }
        case `ADD_FOLDERS_ARRAY`:
            return {
                ...state,
                foldersArray: action.payload
            }
        default:
            return state
    }
}


export const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case `SET_USER_ID`:
            return {
                ...state,
                _id: action.payload

            }
        case `SET_USER_EDITOR_THEME`:
            return {
                ...state,
                editorTheme: action.payload

            }
        case `SET_LOGGED_IN`:
            return {
                ...state,
                loggedIn: true

            }
        case `SET_LOGGED_OFF`:
            return {
                ...state,
                userLanded: true,
                loggedIn: false

            }
        case `SET_USER`:
            return {
                ...state,
                username: action.payload.profile.username ? action.profile.username : "",
                firstName: action.payload.profile.firstName,
                lastName: action.payload.profile.lastName,
                avatar: action.payload.profile.avatar,
                email: action.payload.profile.email,
                editorTheme: action.payload.accountSettings.preferredEditorTheme,
                editorLanguage: action.payload.accountSettings.preferredEditorLanguage,
                language: action.payload.accountSettings.preferredApplicationLanguage,
                loggedIn: true,
                userLanded: true,
                _id: action.payload._id


            }
        case `CLEAR_USER`:
            return {
                ...state,
                username: "",
                firstName: "",
                lastName: "",
                avatar: "",
                editorTheme: "",
                editorLanguage: "",
                language: "",
                loggedIn: false,
                _id: ""


            }
        default:
            return state
    }
}

export const snippetReducer = (state = initialState.snippet, action) => {
    switch (action.type) {
        case `SET_SNIPPET_TITLE`:
            return {
                ...state,
                title: action.payload

            }
        case `SET_EDITOR_LANGUAGE`:
            return {
                ...state,
                editorLanguage: action.payload

            }
        case `SET_SNIPPET_EDITOR_THEME`:
            return {
                ...state,
                editorTheme: action.payload

            }

        case `SET_EDITOR_CODE`:
            return {
                ...state,
                code: action.payload

            }
        case `SET_SNIPPET_COMMENTS`:
            return {
                ...state,
                comments: action.payload

            }
        case `SET_SNIPPET_QUERY_PARAMETERS`:
            return {
                ...state,
                queryParameters: action.payload

            }
        case `EMPTY_THE_SNIPPET`:
            return {
                ...state,
                queryParameters: "",
                code: "",
                title: "",
                comments: ""

            }
        default:
            return state


    }
}