import setAsyncStorageValue from '../../../AsyncStorage/setAsyncStorageValue'

export const getListWithoutElementById = async (
    listItems,
    category,
    idToBeRemoved
) => {
    const filteredItems = 

    return listItems.filter((item) => item.id !== idToBeRemoved)
}
