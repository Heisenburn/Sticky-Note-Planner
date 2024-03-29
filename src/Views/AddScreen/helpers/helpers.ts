import { getDataAfterAddingNoteOrCategory } from '../../../AsyncStorage/getDataAfterAddingNoteOrCategory'
import type {
    CategoryWithNotesType,
    ItemInCategoryType,
} from '../../../types/types'
import { ACTION_PHRASES, ACTIONS } from '../../../Shared/constants'

interface Props {
    action: keyof typeof ACTIONS
    updateData: (newState: CategoryWithNotesType[]) => void
    textFieldInput: string
    categoryInput: CategoryWithNotesType
    categoryId: string
    data: CategoryWithNotesType[]
    noteToBeEdited: ItemInCategoryType
    shouldDisplayCategorySelect: boolean
}

export const updateAsyncLocalStorageData = async ({
    action,
    updateData,
    textFieldInput,
    categoryInput,
    categoryId,
    data,
    noteToBeEdited,
    shouldDisplayCategorySelect,
}: Props) => {
    switch (action) {
        case ACTIONS.ADD_CATEGORY: {
            const filteredArray = await getDataAfterAddingNoteOrCategory({
                noteValue: null,
                categoryId: textFieldInput,
                existingData: data,
            })
            return updateData(filteredArray)
        }
        case ACTIONS.ADD_NOTE: {
            const filteredArray = await getDataAfterAddingNoteOrCategory({
                noteValue: textFieldInput,
                categoryId: shouldDisplayCategorySelect
                    ? categoryInput?.categoryId
                    : categoryId,
                existingData: data,
            })

            return updateData(filteredArray)
        }

        case ACTIONS.EDIT_NOTE: {
            const shouldUpdateCategory = !!categoryInput

            if (shouldUpdateCategory) {
                const originCategoryId = categoryId
                const destinationCategoryId = categoryInput

                const updatedDataArray = data.map((categoryItem) => {
                    //move element to destination category
                    if (
                        categoryItem.categoryId ==
                        destinationCategoryId.categoryId
                    ) {
                        const existingItems = categoryItem.details.items

                        return {
                            ...categoryItem,
                            details: {
                                ...categoryItem.details,
                                items: [...existingItems, noteToBeEdited],
                            },
                        }
                    }
                    //remove element from origin category
                    if (categoryItem.categoryId === originCategoryId) {
                        return {
                            ...categoryItem,
                            details: {
                                ...categoryItem.details,
                                items: categoryItem.details.items.filter(
                                    (item) => item.id !== noteToBeEdited.id
                                ),
                            },
                        }
                    }

                    return categoryItem
                })
                return updateData(updatedDataArray)
            } else {
                //only note value was edited
                const updatedDataArray = data.map((categoryItem) => {
                    if (categoryItem.categoryId === categoryId) {
                        return {
                            ...categoryItem,
                            details: {
                                ...categoryItem.details,
                                items: categoryItem.details.items.map(
                                    (item) => {
                                        if (item.id === noteToBeEdited.id) {
                                            return {
                                                ...item,
                                                note: textFieldInput,
                                            }
                                        }
                                        return item
                                    }
                                ),
                            },
                        }
                    }
                    return categoryItem
                })
                return updateData(updatedDataArray)
            }
        }
        default:
            break
    }
}

export const getHeading = (
    action: keyof typeof ACTIONS,
    categoryTitle?: string
) => {
    switch (action) {
        case ACTIONS.EDIT_NOTE:
            return ACTION_PHRASES[ACTIONS.EDIT_NOTE]
        case ACTIONS.ADD_CATEGORY:
            return ACTION_PHRASES[ACTIONS.ADD_CATEGORY]
        case ACTIONS.ADD_NOTE:
            return `${ACTION_PHRASES[ACTIONS.ADD_NOTE]} ${
                categoryTitle ? 'w kategorii: ' + categoryTitle : ''
            }`
    }
}
