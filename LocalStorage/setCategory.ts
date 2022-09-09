import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export const ALL_CATEGORIES_KEY = 'ALL_CATEGORIES'
//because of PREDEFINED_CATEGORIES
const STARTING_ID_VALUE = 3

export const setCategory = async (input) => {
    try {
        //TODO: tutaj ten sam kod co w saveNoteToCategory - DRY
        //append if there are existing categories
        const response = await AsyncStorage.getItem(ALL_CATEGORIES_KEY).then(
            (existingCategories) => {
                const arrayOfCategories = existingCategories
                    ? JSON.parse(existingCategories)
                    : []

                arrayOfCategories.push({
                    id:
                        arrayOfCategories.length > 0
                            ? arrayOfCategories.at(-1).id + 1
                            : STARTING_ID_VALUE,
                    title: input,
                })

                console.log({ arrayOfCategories })
                AsyncStorage.setItem(
                    ALL_CATEGORIES_KEY,
                    JSON.stringify(arrayOfCategories)
                )
            }
        )

        if (response !== null) {
            return true
        }
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}
