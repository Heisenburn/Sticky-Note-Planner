import { ACTIONS } from '../../../Shared/constants'
import { getDataAfterAddingNoteOrCategory } from '../../../AsyncStorage/getDataAfterAddingNoteOrCategory'

export const updateDataAndGoToScreen = async ({
    action,
    updateData,
    navigation,
    textFieldInput,
    categoryInput,
    categoryId,
    categoryTitle,
    data,
    listItems,
    editedItem,
    shouldDisplayCategorySelect,
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
            const shouldUpdateCategory = categoryInput !== categoryId

            return
            if (shouldUpdateCategory) {
                const originListWithRemovedElement = listItems.filter(
                    (item) => item.id !== editedItem.id
                )

                console.log({ originListWithRemovedElement })
                return
            } else {
                //only note value was edited
                const originListWithEditedItem = listItems.map((item) => {
                    if (item.id === editedItem.id) {
                        return { ...item, text: textFieldInput }
                    } else {
                        return item
                    }
                })

                // const filteredArray = await getDataAfterAddingNoteOrCategory({
                //     noteValue: textFieldInput,
                //     categoryId: clickedCategory,
                //     existingData: data,
                // })
                // updateData(filteredArray.final)

                navigation.navigate('ListViewScreen', {
                    passedPropsFromPreviousScreen: {
                        category: {
                            categoryId: categoryInput,
                        },
                    },
                })
            }
        }
    }
}
