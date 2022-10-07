import { getDataAfterAddingNoteOrCategory } from '../../../AsyncStorage/getDataAfterAddingNoteOrCategory'
import { CategoryWithNotesType } from '../../../types/types'
import { ACTION_PHRASES, ACTIONS } from '../../../Shared/constants'

export const updateAsyncLocalStorageData = async ({
    action,
    updateData,
    textFieldInput,
    categoryInput,
    categoryId,
    data,
    noteValueToBeEdited,
    shouldDisplayCategorySelect,
}: {
    action: keyof typeof ACTIONS
    updateData
    textFieldInput
    categoryInput
    categoryId
    data: CategoryWithNotesType[]
    noteValueToBeEdited
    shouldDisplayCategorySelect
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
            const shouldUpdateCategory = categoryInput

            console.log({ shouldUpdateCategory })
            if (!!shouldUpdateCategory) {
                const originCategoryId = categoryId
                const destinationCategoryId = categoryInput

                const filteredArray = data.filter((item) => {
                    //move element to destination category
                    if (item.categoryId == destinationCategoryId) {
                        item.details.items.push({
                            note: textFieldInput,
                            id: item.details.items.length + 1,
                        })
                        return item
                    }
                    //remove element from origin category
                    if (item.categoryId === originCategoryId) {
                        const originCategoryWithoutMovedNoted =
                            item.details.items.filter(
                                (item) => item !== textFieldInput
                            )
                        item.details.items = originCategoryWithoutMovedNoted
                        return item
                    }
                    return item
                })
                return updateData(filteredArray)
            } else {
                //only note value was edited

                const filteredArray = data.filter((item) => {
                    //clicked category
                    if (item.categoryId === categoryId) {
                        //get index of changed element and replace it with new value
                        const indexOfChangedElement =
                            item.details.items.indexOf(noteValueToBeEdited)
                        item.details.items[indexOfChangedElement] =
                            textFieldInput
                        return item
                    }
                    return item
                })
                return updateData(filteredArray)
            }
        }
        default:
            break
    }
}

export const getHeading = (action, categoryTitle) => {
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
