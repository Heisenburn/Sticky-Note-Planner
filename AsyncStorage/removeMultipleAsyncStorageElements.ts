import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export const removeMultipleAsyncStorageElements = async (
    arrayOfElementsToRemove: string[]
) => {
    try {
        await AsyncStorage.multiRemove(arrayOfElementsToRemove)
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}
