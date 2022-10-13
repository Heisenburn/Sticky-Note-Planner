import { getDataAfterAddingNoteOrCategory } from '../../../AsyncStorage/getDataAfterAddingNoteOrCategory'
import type {
    CategoryNotesItemsType,
    CategoryWithNotesType,
} from '../../../types/types'
import { ACTION_PHRASES, ACTIONS } from '../../../Shared/constants'

export const updateAsyncLocalStorageData = async ({
    action,
    updateData,
    textFieldInput,
    categoryInput,
    categoryId,
    data,
    noteToBeEdited,
    shouldDisplayCategorySelect,
}: {
    action: keyof typeof ACTIONS
    updateData: (newState: CategoryWithNotesType[]) => void
    textFieldInput: string
    categoryInput: string
    categoryId: string
    data: CategoryWithNotesType[]
    noteToBeEdited: CategoryNotesItemsType
    shouldDisplayCategorySelect: boolean
}) => {
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
                    ? categoryInput
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

                const updatedDataArray = data.map((item) => {
                    //move element to destination category
                    if (item.categoryId == destinationCategoryId) {
                        item.details.items.push({
                            note: textFieldInput,
                            id: `${item.details.items.length + 1}`,
                        })
                        return item
                    }
                    //remove element from origin category
                    if (item.categoryId === originCategoryId) {
                        item.details.items = item.details.items.filter(
                            (item) => item.note !== textFieldInput
                        )
                        return item
                    }
                    return item
                })
                return updateData(updatedDataArray)
            } else {
                //only note value was edited

                const updatedDataArray = data.map((categoryItem) => {
                    if (categoryItem.categoryId === categoryId) {
                        const elementToBeUpdated =
                            categoryItem.details.items.find(
                                (item) => item.id === noteToBeEdited.id
                            )

                        elementToBeUpdated.note = textFieldInput
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

export const getHeading = (action: any, categoryTitle: string) => {
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
