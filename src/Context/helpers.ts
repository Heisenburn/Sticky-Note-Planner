import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import {
    PREDEFINED_CATEGORIES,
    PREDEFINED_CATEGORIES_KEY_SUFFIX,
} from '../Shared/constants'

export const setPredefinedCategories = async () => {
    try {
        await AsyncStorage.multiSet(
            PREDEFINED_CATEGORIES.map(({ categoryTitle }) => {
                const categoryId = `${PREDEFINED_CATEGORIES_KEY_SUFFIX}-${categoryTitle}`

                const defaultCategoriesWithNotes = {
                    categoryId,
                    details: {
                        categoryTitle,
                        items: [],
                    },
                }

                return [categoryId, JSON.stringify(defaultCategoriesWithNotes)]
            })
        )
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}
