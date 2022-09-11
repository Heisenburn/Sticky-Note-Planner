import setNotesInCategory from '../../../AsyncStorage/setNotesInCategory'

export const getListWithoutElementById = async (
    listItems,
    category,
    idToBeRemoved
) => {
    const filteredItems = 

    return listItems.filter((item) => item.id !== idToBeRemoved)
}
