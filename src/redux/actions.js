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
export const setEditorThemeAction = (theme) => {
    return {
        type: `SET_EDITOR_THEME`,
        payload: theme
    }
}
export const setEditorCode = (code) => {
    return {
        type: `SET_EDITOR_CODE`,
        payload: code
    }
}