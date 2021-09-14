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
export const emptyTheSnippetAction = () => {
    return {
        type: `EMPTY_THE_SNIPPET`

    }
}

// *********************** USER *********************** //

export const setEditorThemeAction = (theme) => {
    return {
        type: `SET_EDITOR_THEME`,
        payload: theme

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
export const setLoggedOffAction = (value) => {
    return {
        type: `SET_LOGGED_OFF`,
        payload: value
    }
}
export const setUserIdAction = (id) => {
    return {
        type: `SET_USER_ID`,
        payload: id
    }
}