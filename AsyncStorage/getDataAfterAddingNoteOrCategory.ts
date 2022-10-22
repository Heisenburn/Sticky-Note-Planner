import AsyncStorage from '@react-native-async-storage/async-storage'
import { CATEGORY_KEY_PREFIX } from '../Shared/constants'
import type { CategoryWithNotesType } from '../types/types'
import { getKeysForExistingCategories } from './getKeysForExistingCategories'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

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
    const categoryId = uuidv4()

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

        const randomCategoryKey = '@CATEGORY-PREDEFINED-RANDOM'
        const category = categoryId || randomCategoryKey

        return existingData.map((item) => {
            if (item.categoryId === category) {
                item.details.items.push({
                    note: noteValue,
                    id: uuidv4(),
                    checked: false,
                })
                return item
            }
            return item
        })

        //2. saving category
    } else {
        const categoryKeyId = await getNewCategoryKeyWithId(categoryId)

        const newElement: CategoryWithNotesType = {
            categoryId: categoryKeyId,
            details: {
                categoryTitle: categoryId,
                items: [],
            },
        }

        return [...existingData, newElement]
    }
}
