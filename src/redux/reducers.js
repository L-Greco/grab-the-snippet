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
        default:
            return state
    }
}


export const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case `SET_EDITOR_THEME`:
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
                loggedIn: false

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

        case `SET_EDITOR_CODE`:
            return {
                ...state,
                code: action.payload

            }
        default:
            return state


    }
}