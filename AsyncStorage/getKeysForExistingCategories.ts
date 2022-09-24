import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    CATEGORY_KEY_PREFIX,
    PREDEFINED_CATEGORIES_KEY_SUFFIX,
} from '../Shared/constants'
import { Alert } from 'react-native'

export const getKeysForExistingCategories = async (): Promise<string[]> => {
    //get all available keys in AsyncStorage
    let availableKeys = []
    try {
        availableKeys = await AsyncStorage.getAllKeys()
        //get only keys with category prefix
        return availableKeys.filter((item) => {
            if (
                !item.includes(PREDEFINED_CATEGORIES_KEY_SUFFIX) &&
                item.includes(CATEGORY_KEY_PREFIX)
            ) {
                return item
            }
        })
    } catch (error) {
        Alert.alert(error)
        throw error
    }
}
