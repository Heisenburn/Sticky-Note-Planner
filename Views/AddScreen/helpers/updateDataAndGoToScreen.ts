import { ACTIONS } from '../../../Shared/constants'
import { getDataAfterAddingNoteOrCategory } from '../../../AsyncStorage/getDataAfterAddingNoteOrCategory'
import { CategoryWithNotesType } from '../../../types/types'

export const updateDataAndGoToScreen = async ({
    action,
    updateData,
    navigation,
    textFieldInput,
    categoryInput,
    categoryId,
    data,
    editedItem,
    shouldDisplayCategorySelect,
}: {
    action: keyof typeof ACTIONS
    updateData
    navigation
    textFieldInput
    categoryInput
    categoryId
    data: CategoryWithNotesType[]
    editedItem: string
    shouldDisplayCategorySelect
}) => {
    switch (action) {
        case ACTIONS.ADD_CATEGORY: {
            const filteredArray = await getDataAfterAddingNoteOrCategory({
                noteValue: null,
                categoryId: textFieldInput,
                existingData: data,
            })
            updateData(filteredArray)
            // return navigation.navigate('ListViewScreen', {
            //     categoryTitle: textFieldInput,
            //     categoryId: filteredArray.pop().categoryId,
            // })
            return navigation.navigate('HomeScreen')
        }
        case ACTIONS.ADD_NOTE: {
            const filteredArray = await getDataAfterAddingNoteOrCategory({
                noteValue: textFieldInput,
                categoryId: shouldDisplayCategorySelect
                    ? categoryInput
                    : categoryId,
                existingData: data,
            })

            updateData(filteredArray)

            return navigation.navigate('ListViewScreen', {
                passedPropsFromPreviousScreen: {
                    category: {
                        categoryId: categoryInput,
                    },
                },
            })
        }

        case ACTIONS.EDIT_NOTE: {
            const shouldUpdateCategory = categoryInput

            if (!!shouldUpdateCategory) {
                const originCategoryId = categoryId
                const destinationCategoryId = categoryInput

                const filteredArray = data.filter((item) => {
                    //move element to destination category
                    if (item.categoryId == destinationCategoryId) {
                        item.details.items.push(textFieldInput)
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
                updateData(filteredArray)
                return navigation.navigate('ListViewScreen', {
                    passedPropsFromPreviousScreen: {
                        category: {
                            categoryId: destinationCategoryId,
                        },
                    },
                })
            } else {
                //only note value was edited

                const filteredArray = data.filter((item) => {
                    //clicked category
                    if (item.categoryId === categoryId) {
                        //get index of changed element and replace it with new value
                        const indexOfChangedElement =
                            item.details.items.indexOf(editedItem.text)
                        item.details.items[indexOfChangedElement] =
                            textFieldInput
                        return item
                    }
                    return item
                })

                updateData(filteredArray)
                return navigation.navigate('ListViewScreen', {
                    passedPropsFromPreviousScreen: {
                        category: {
                            categoryId,
                        },
                    },
                })
            }
        }
    }
}
