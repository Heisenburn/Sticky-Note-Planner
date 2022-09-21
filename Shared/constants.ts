export const PREDEFINED_CATEGORIES = [
    {
        categoryTitle: 'WEEK',
    },
    {
        categoryTitle: 'RANDOM',
    },
]

export const CATEGORY_KEY_PREFIX = '@CATEGORY-'
export const PREDEFINED_CATEGORIES_KEY_SUFFIX = `${CATEGORY_KEY_PREFIX}PREDEFINED`

export enum ACTIONS {
    ADD_NOTE = 'ADD_NOTE',
    ADD_CATEGORY = 'ADD_CATEGORY',
    EDIT_NOTE = 'EDIT_NOTE',
}

export const ACTION_PHRASES = {
    [ACTIONS.ADD_CATEGORY]: 'Dodawanie kategorii',
    [ACTIONS.ADD_NOTE]: 'Dodawanie notatki',
    [ACTIONS.EDIT_NOTE]: 'Edytowanie notatki',
}
