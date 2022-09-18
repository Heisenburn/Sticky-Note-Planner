import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { CATEGORY_KEY_PREFIX } from '../Shared/constants'
import { CategoryWithNotesType } from '../types/types'
import { getKeysForExistingCategories } from '../Context/helpers/getKeysForExistingCategories'

export const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
        return keys
    } catch (e) {
        // read key error
    }

    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
}

const getNewCategoryKeyWithId = async (category) => {
    //first get all keys with category in key
    //then get last ID to be used when creating new category
    const keysWithCategoryKeyword = await getKeysForExistingCategories()
    const categoryId = keysWithCategoryKeyword.length + 1

    //remove whitespaces and add prefix + suffix
    return `${CATEGORY_KEY_PREFIX}${category.replace(
        /\s+/,
        ' '
    )}-ID${categoryId}`
}

export const getDataAfterAddingNoteOrCategory = async ({
    noteValue,
    categoryId,
    existingData,
}: {
    noteValue: null | string
    categoryId: null | string
    existingData: CategoryWithNotesType[]
}): Promise<CategoryWithNotesType[]> => {
    //1. saving note to category
    if (noteValue) {
        //append if there are existing notes for this category

        const existingDataWithNewNoteInCategory = existingData.filter(
            (item) => {
                if (item.categoryId === categoryId) {
                    item.details.items.push(noteValue)
                    return item
                }
                return item
            }
        )

        return existingDataWithNewNoteInCategory

        //2. saving category
    } else {
        const categoryKeyId = await getNewCategoryKeyWithId(categoryId)

        const newElement = {
            categoryId: categoryKeyId,
            details: {
                categoryTitle: categoryId,
                items: [],
            },
        }

        return [...existingData, newElement]
    }
}
