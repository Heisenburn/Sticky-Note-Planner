import AsyncStorage from '@react-native-async-storage/async-storage'
import { CATEGORY_KEY_PREFIX } from '../../Shared/constants'
import { Alert } from 'react-native'

export const getKeysForExistingCategories = async (): Promise<string[]> => {
    //get all available keys in AsyncStorage
    let availableKeys = []
    try {
        availableKeys = await AsyncStorage.getAllKeys()
        //get only keys with category prefix
        return availableKeys.filter((item) =>
            item.includes(CATEGORY_KEY_PREFIX)
        )
    } catch (error) {
        Alert.alert(error)
        throw error
    }
}
