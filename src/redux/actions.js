// *********************** PAGE *********************** //

export const openCardModalAction = () => {
    return {
        type: `OPEN_CARD_MODAL`
    }
}

export const closeCardModalAction = () => {
    return {
        type: `CLOSE_CARD_MODAL`
    }
}
export const openAccountModalAction = () => {
    return {
        type: `OPEN_ACCOUNT_MODAL`
    }
}
export const closeAccountModalAction = () => {
    return {
        type: `CLOSE_ACCOUNT_MODAL`
    }
}
export const openAddSnippetModalAction = () => {
    return {
        type: `OPEN_ADD_A_SNIPPET_MODAL`
    }
}

export const closeAddSnippetModalAction = () => {
    return {
        type: `CLOSE_ADD_A_SNIPPET_MODAL`
    }
}
export const addParentAction = (parent) => {
    return {
        type: `ADD_PARENT`,
        payload: parent

    }
}
export const addSnippetsArrayAction = (array) => {
    return {
        type: `ADD_SNIPPETS_ARRAY`,
        payload: array

    }
}
export const addFoldersArrayAction = (array) => {
    return {
        type: `ADD_FOLDERS_ARRAY`,
        payload: array

    }
}
export const cardModalisLoadingAction = (boolean) => {
    return {
        type: `CARD_MODAL_IS_LOADING`,
        payload: boolean
    }
}
export const addSnippetTOArrayAction = (snippet) => {
    return {
        type: `ADD_SNIPPET_TO_ARRAY`,
        payload: snippet
    }
}
export const removeSnippetFromArrayAction = (id) => {
    return {
        type: `REMOVE_SNIPPET_FROM_ARRAY`,
        payload: id
    }
}
export const replaceSnippetFromArrayAction = (snippet) => {
    return {
        type: `REPLACE_SNIPPET_FROM_ARRAY`,
        payload: snippet
    }
}
export const addFolderTOArrayAction = (folder) => {
    return {
        type: `ADD_FOLDER_TO_ARRAY`,
        payload: folder
    }
}
export const removeFolderFromArrayAction = (index) => {
    return {
        type: `REMOVE_FOLDER_FROM_ARRAY`,
        payload: index
    }
}
export const toggleFolderSettingsModalAction = (boolean) => {
    return {
        type: `TOGGLE_FOLDER_SETTINGS_MODAL`,
        payload: boolean
    }
}
// *********************** SNIPPET *********************** //

export const setSnippetTitleAction = (title) => {
    return {
        type: `SET_SNIPPET_TITLE`,
        payload: title
    }
}
export const setEditorLanguageAction = (language) => {
    return {
        type: `SET_EDITOR_LANGUAGE`,
        payload: language
    }
}
export const setSnippetEditorThemeAction = (theme) => {
    return {
        type: `SET_SNIPPET_EDITOR_THEME`,
        payload: theme
    }
}

export const setEditorCodeAction = (code) => {
    return {
        type: `SET_EDITOR_CODE`,
        payload: code
    }
}
export const setSnippetCommentsAction = (comments) => {
    return {
        type: `SET_SNIPPET_COMMENTS`,
        payload: comments
    }
}
export const setQueryParametersAction = (query) => {
    return {
        type: `SET_SNIPPET_QUERY_PARAMETERS`,
        payload: query
    }
}
export const emptyTheSnippetAction = (userLanguage, userTheme) => {
    return {
        type: `EMPTY_THE_SNIPPET`,
        payload: { userLanguage, userTheme }

    }
}
export const setTheSnippetAction = (snippet) => {
    return {
        type: `SET_THE_SNIPPET`,
        payload: snippet

    }
}
export const setUsersFoldersAction = (array) => {
    return {
        type: `SET_USERS_FOLDERS_ARRAY`,
        payload: array

    }
}

// *********************** USER *********************** //

export const setUserThemeAction = (theme) => {
    return {
        type: `SET_USER_EDITOR_THEME`,
        payload: theme

    }
}
export const setUserLanguageAction = (language) => {
    return {
        type: `SET_USER_EDITOR_LANGUAGE`,
        payload: language

    }
}
export const setUserAction = (user) => {
    return {
        type: `SET_USER`,
        payload: user

    }
}
export const clearUserAction = (user) => {
    return {
        type: `CLEAR_USER`,
        payload: user

    }
}

export const setLoggedInAction = (value) => {
    return {
        type: `SET_LOGGED_IN`

    }
}
export const setLoggedOffAction = () => {
    return {
        type: `SET_LOGGED_OFF`

    }
}
export const setUserIdAction = (id) => {
    return {
        type: `SET_USER_ID`,
        payload: id
    }
}
export const addFolderToUserFoldersArrayAction = (folder) => {
    return {
        type: `ADD_FOLDER_TO_USER_FOLDERS_ARRAY`,
        payload: folder
    }
}
// not yet ready
// export const removeFolderToUserFoldersArrayAction = (folder) => {
//     return {
//         type: `ADD_FOLDER_TO_USER_ARRAY`,
//         payload: folder
//     }
// }