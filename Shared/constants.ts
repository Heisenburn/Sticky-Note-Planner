export const PREDEFINED_CATEGORIES = [
    {
        categoryId: 1,
        categoryTitle: 'Tydzień',
        items: [],
    },
    {
        categoryId: 2,
        categoryTitle: 'RANDOM',
        items: [],
    },
]

export const CATEGORY_KEY_PREFIX = '@CATEGORY-'

export enum ACTIONS {
    ADD_NOTE,
    ADD_CATEGORY,
    EDIT_NOTE,
}

export const ACTION_PHRASES = {
    [ACTIONS.ADD_CATEGORY]: 'Dodawanie kategorii',
    [ACTIONS.ADD_NOTE]: 'Dodawanie notatki',
    [ACTIONS.EDIT_NOTE]: 'Edytowanie notatki',
}
