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

// *********************** USER *********************** //

export const setEditorThemeAction = (theme) => {
    return {
        type: `SET_EDITOR_THEME`,
        payload: theme

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