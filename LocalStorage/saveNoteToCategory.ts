import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { CATEGORY_KEY_PREFIX } from '../shared/constants'

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

const saveNoteToCategory = async ({
    noteValue,
    categoryValue,
}: {
    noteValue: null | string
    categoryValue: null | string
}) => {
    try {
        const category = categoryValue || 'RANDOM'
        let response = null

        //1. saving note to category
        if (noteValue) {
            //append if there are existing notes for this category
            response = await AsyncStorage.getItem(category).then((response) => {
                let arrayOfNotes = response ? JSON.parse(response) : []

                arrayOfNotes.items.push(noteValue)

                AsyncStorage.setItem(category, JSON.stringify(arrayOfNotes))
            })
            //2. saving category
        } else {
            //first get all keys with category in key
            //then get last ID to be used when creating new category
            const availableKeys = await getAllKeys()
            const keysWithCategoryKeyword = availableKeys.filter((item) =>
                item.includes(CATEGORY_KEY_PREFIX)
            )

            const categoryDetails = {
                categoryTitle: categoryValue,
                items: [],
            }

            const categoryId = keysWithCategoryKeyword.length + 1

            //remove whitespaces and add prefix + suffix
            const categoryKey = `${CATEGORY_KEY_PREFIX}${category.replace(
                /\s+/,
                ' '
            )}-ID${categoryId}`

            response = AsyncStorage.setItem(
                categoryKey,
                JSON.stringify(categoryDetails)
            )
        }

        if (response !== null) {
            Alert.alert('Notatka', 'Zapisano! ✅')
            return true
        }
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}

export default saveNoteToCategory
