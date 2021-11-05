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
        case `CARD_MODAL_IS_LOADING`:
            return {
                ...state,
                cardModalIsLoading: action.payload
            }
        case `ADD_SNIPPET_TO_ARRAY`:
            return {
                ...state,
                snippetsArray: [...state.snippetsArray, action.payload]
            }
        case `REMOVE_SNIPPET_FROM_ARRAY`:
            let newSnippetArray = state.snippetsArray.filter((snippet) => snippet._id !== action.payload)
            return {
                ...state,
                snippetsArray: newSnippetArray
            }
        case `ADD_FOLDER_TO_ARRAY`:
            return {
                ...state,
                foldersArray: [...state.foldersArray, action.payload]
            }
        case `REMOVE_FOLDER_FROM_ARRAY`:
            let newFoldersArray = state.foldersArray.filter((folder, i) => i !== action.payload)
            return {
                ...state,
                foldersArray: newFoldersArray
            }
        case `ADD_FOLDER_TO_USER_FOLDERS_ARRAY`:
            return {
                ...state,
                userFolders: [...state.userFolders, action.payload]


            }
        case `SET_USERS_FOLDERS_ARRAY`:
            return {
                ...state,
                userFolders: [...action.payload]


            }
        case `TOGGLE_FOLDER_SETTINGS_MODAL`:
            return {
                ...state,
                folderSettingsModalIsOpen: action.payload


            }
        case `REPLACE_SNIPPET_FROM_ARRAY`:
            let filteredArray = state.snippetsArray.map(snippet => snippet._id === action.payload._id ? action.payload : snippet)
            return {
                ...state,
                snippetsArray: filteredArray
            }
        case `CHANGE_FOLDER_NAME`:
            const folder = state.userFolders.filter(folder => folder._id === action.folderId)[0]
            console.log(action.folderId)
            console.log(folder)
            folder.name = action.folderName

            return {
                ...state

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
        case `SET_USER_EDITOR_LANGUAGE`:
            return {
                ...state,
                editorLanguage: action.payload

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
                username: action.payload.profile.userName ? action.payload.profile.userName : "",
                firstName: action.payload.profile.firstName,
                lastName: action.payload.profile.lastName,
                avatar: action.payload.profile.avatar,
                email: action.payload.profile.email,
                editorTheme: action.payload.accountSettings.preferredEditorTheme,
                editorLanguage: action.payload.accountSettings.preferredEditorLanguage,
                language: action.payload.accountSettings.preferredApplicationLanguage,
                loggedIn: true,
                userLanded: true,
                _id: action.payload._id,
                provider: action.payload.provider



            }
        case `CLEAR_USER`:
            return {
                ...state,
                username: "",
                firstName: "",
                lastName: "",
                avatar: "",
                email: "",
                editorTheme: "",
                editorLanguage: "",
                language: "",
                loggedIn: false,
                userLanded: true,
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
                comments: "",
                editorLanguage: action.payload.userLanguage,
                editorTheme: action.payload.userTheme,
                id: ""


            }
        case `SET_THE_SNIPPET`:
            return {
                ...state,
                queryParameters: action.payload.queryParameters ? action.payload.queryParameters : "",
                code: action.payload.code,
                title: action.payload.title,
                comments: action.payload.comments ? action.payload.comments : "",
                editorLanguage: action.payload.language,
                id: action.payload._id


            }
        default:
            return state


    }
}